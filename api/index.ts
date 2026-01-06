// Vercel Serverless Function for GitHub Commits Card
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { themes } from '../src/themes';
import { generateSVG, renderError } from '../src/generator';
import { fetchGitHubData } from '../src/utils';
import { CardConfig, Theme } from '../src/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Parse query parameters
        const {
            u, username,
            repo, r,
            count, c,
            w, width,
            theme = 'dark',
            bg, border, title, text, accent,
            font = 'jetbrains',
            radius = '10',
            icons = 'true',
            stats = 'true',
            avatar = 'true',
            date = 'true'
        } = req.query;

        // Get username and repo
        const user = (u || username) as string;
        const repository = (repo || r) as string;

        // Validate required parameters
        if (!user || !repository) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.setHeader('Cache-Control', 'no-cache');
            return res.status(400).send(renderError('Missing username (u) or repository (repo)'));
        }

        // Parse numeric values
        const commitCount = Math.min(20, Math.max(1, parseInt((count || c || '5') as string, 10)));
        const cardWidth = Math.min(800, Math.max(300, parseInt((w || width || '500') as string, 10)));
        const borderRadius = Math.min(30, Math.max(0, parseInt(radius as string, 10)));

        // Get theme colors
        const themeName = theme as string;
        const selectedTheme: Theme = themes[themeName] || themes.dark;

        // Build config
        const config: CardConfig = {
            username: user,
            repo: repository,
            count: commitCount,
            width: cardWidth,
            theme: themeName,
            bg: (bg as string) || selectedTheme.bg,
            border: (border as string) || selectedTheme.border,
            title: (title as string) || selectedTheme.title,
            text: (text as string) || selectedTheme.text,
            subtext: selectedTheme.subtext,
            accent: (accent as string) || selectedTheme.accent,
            sha: selectedTheme.sha,
            font: font as string,
            radius: borderRadius,
            borderWidth: 1,
            showIcons: icons !== 'false',
            showStats: stats !== 'false',
            showAvatar: avatar !== 'false',
            showDate: date !== 'false'
        };

        // Fetch data from GitHub
        const githubToken = process.env.GITHUB_TOKEN;
        const data = await fetchGitHubData(user, repository, commitCount, githubToken);

        // Generate SVG
        const svg = generateSVG(data, config);

        // Send response
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');
        return res.status(200).send(svg);

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache');
        return res.status(200).send(renderError(message));
    }
}

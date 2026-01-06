// Cloudflare Workers entry point for GitHub Commits Card
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
// Cloudflare specific manifest import
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
import { themes } from '../src/themes';
import { generateSVG, renderError } from '../src/generator';
import { fetchGitHubData } from '../src/utils';
import { CardConfig, Theme } from '../src/types';

export interface Env {
    GITHUB_TOKEN?: string;
    __STATIC_CONTENT: any;
}

const assetManifest = JSON.parse(manifestJSON);

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const params = url.searchParams;

        // Route: API Request (if 'u' param exists or path starts with /api)
        // This maintains the existing usability of /?u=... and also allows /api path
        if (params.has('u') || params.has('username') || url.pathname.startsWith('/api')) {
            try {
                // Parse query parameters
                const user = params.get('u') || params.get('username');
                const repository = params.get('repo') || params.get('r');

                // Validate required parameters
                if (!user || !repository) {
                    return new Response(renderError('Missing username (u) or repository (repo)'), {
                        status: 400,
                        headers: {
                            'Content-Type': 'image/svg+xml',
                            'Cache-Control': 'no-cache'
                        }
                    });
                }

                // Parse optional parameters
                const commitCount = Math.min(20, Math.max(1, parseInt(params.get('count') || params.get('c') || '5', 10)));
                const cardWidth = Math.min(800, Math.max(300, parseInt(params.get('w') || params.get('width') || '500', 10)));
                const borderRadius = Math.min(30, Math.max(0, parseInt(params.get('radius') || '10', 10)));
                const themeName = params.get('theme') || 'dark';
                const font = params.get('font') || 'jetbrains';

                // Get theme colors
                const selectedTheme: Theme = themes[themeName] || themes.dark;

                // Build config
                const config: CardConfig = {
                    username: user,
                    repo: repository,
                    count: commitCount,
                    width: cardWidth,
                    theme: themeName,
                    bg: params.get('bg') || selectedTheme.bg,
                    border: params.get('border') || selectedTheme.border,
                    title: params.get('title') || selectedTheme.title,
                    text: params.get('text') || selectedTheme.text,
                    subtext: selectedTheme.subtext,
                    accent: params.get('accent') || selectedTheme.accent,
                    sha: selectedTheme.sha,
                    font: font,
                    radius: borderRadius,
                    borderWidth: 1,
                    showIcons: params.get('icons') !== 'false',
                    showStats: params.get('stats') !== 'false',
                    showAvatar: params.get('avatar') !== 'false',
                    showDate: params.get('date') !== 'false'
                };

                // Fetch data from GitHub
                const data = await fetchGitHubData(user, repository, commitCount, env.GITHUB_TOKEN);

                // Generate SVG
                const svg = generateSVG(data, config);

                // Return response
                return new Response(svg, {
                    status: 200,
                    headers: {
                        'Content-Type': 'image/svg+xml',
                        'Cache-Control': 's-maxage=1800, stale-while-revalidate',
                        'Access-Control-Allow-Origin': '*'
                    }
                });

            } catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error occurred';
                return new Response(renderError(message), {
                    status: 200,
                    headers: {
                        'Content-Type': 'image/svg+xml',
                        'Cache-Control': 'no-cache'
                    }
                });
            }
        }

        // Route: Static Content (Home page, favicon, etc.)
        try {
            return await getAssetFromKV(
                {
                    request,
                    waitUntil: ctx.waitUntil.bind(ctx),
                },
                {
                    ASSET_NAMESPACE: env.__STATIC_CONTENT,
                    ASSET_MANIFEST: assetManifest,
                }
            );
        } catch (e) {
            // If asset not found, return 404
            return new Response('Not Found', { status: 404 });
        }
    }
};

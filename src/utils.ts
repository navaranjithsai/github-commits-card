// Utility functions for GitHub Commits Card
import { GitHubData, GitHubRepo, GitHubCommit } from './types';

/**
 * Escape XML special characters to prevent injection
 */
export function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format large numbers with k/M suffix
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

/**
 * Fetch repository and commit data from GitHub API
 */
export async function fetchGitHubData(
    username: string,
    repo: string,
    count: number,
    token?: string
): Promise<GitHubData> {
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'github-commits-card'
    };

    if (token) {
        headers['Authorization'] = `token ${token}`;
    }

    // Fetch repo info
    const repoResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}`,
        { headers }
    );

    if (!repoResponse.ok) {
        if (repoResponse.status === 404) {
            throw new Error(`Repository not found: ${username}/${repo}`);
        }
        if (repoResponse.status === 403) {
            throw new Error('Rate limit exceeded. Try again later or add GITHUB_TOKEN.');
        }
        throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json() as GitHubRepo;

    // Fetch commits
    const commitsResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/commits?per_page=${count}`,
        { headers }
    );

    if (!commitsResponse.ok) {
        throw new Error('Failed to fetch commits');
    }

    const commits = await commitsResponse.json() as GitHubCommit[];

    return { repo: repoData, commits };
}


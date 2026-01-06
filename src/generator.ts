// SVG Generator for GitHub Commits Card
import { CardConfig, GitHubData } from './types';
import { fonts } from './fonts';
import { escapeXml, truncateText, formatNumber } from './utils';

/**
 * Generate an error SVG card
 */
export function renderError(message: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120">
    <rect width="400" height="120" fill="#0d1117" rx="10"/>
    <rect x="0.5" y="0.5" width="399" height="119" fill="none" stroke="#f85149" rx="10" stroke-width="1"/>
    <text x="200" y="50" fill="#f85149" font-family="'JetBrains Mono', monospace" font-size="14" text-anchor="middle">⚠️ Error</text>
    <text x="200" y="75" fill="#f85149" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">${escapeXml(message)}</text>
</svg>`;
}

/**
 * Generate the main SVG card
 */
export function generateSVG(data: GitHubData, config: CardConfig): string {
    const { repo, commits } = data;
    const width = config.width;
    const fontFamily = fonts[config.font] || fonts.jetbrains;

    // Calculate height based on content
    const headerHeight = config.showStats ? 100 : 70;
    const commitHeight = 60;
    const padding = 20;
    const height = headerHeight + (commits.length * commitHeight) + padding * 2 + 20;

    // SVG Header with embedded fonts
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
    <defs>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Inter:wght@400;500;600;700&amp;family=Fira+Code:wght@400;500;600&amp;display=swap');
            
            .card-bg { fill: #${config.bg}; }
            .card-border { stroke: #${config.border}; stroke-width: ${config.borderWidth}; fill: none; }
            .title { fill: #${config.title}; font-family: ${fontFamily}; font-weight: 700; }
            .subtitle { fill: #${config.subtext}; font-family: ${fontFamily}; font-weight: 400; }
            .text { fill: #${config.text}; font-family: ${fontFamily}; font-weight: 500; }
            .text-muted { fill: #${config.subtext}; font-family: ${fontFamily}; font-weight: 400; }
            .sha { fill: #${config.sha}; font-family: ${fontFamily}; font-weight: 600; }
            .accent { fill: #${config.accent}; }
            .icon { fill: #${config.subtext}; }
            .stat-value { fill: #${config.text}; font-family: ${fontFamily}; font-weight: 700; }
            .stat-label { fill: #${config.subtext}; font-family: ${fontFamily}; font-weight: 400; }
            .commit-line { stroke: #${config.border}; stroke-width: 1; }
            .commit-dot { fill: #${config.accent}; }
            .divider { stroke: #${config.border}; stroke-width: 1; }
        </style>
        <clipPath id="avatarClip">
            <circle cx="35" cy="40" r="20"/>
        </clipPath>
    </defs>
    
    <!-- Background -->
    <rect class="card-bg" width="${width}" height="${height}" rx="${config.radius}"/>
    <rect class="card-border" x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${config.radius}"/>`;

    // Header section
    let yOffset = padding;

    // Avatar and repo name
    if (config.showAvatar) {
        svg += `
    <!-- Avatar -->
    <image href="${repo.owner.avatar_url}" x="15" y="20" width="40" height="40" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="35" cy="40" r="20" stroke="#${config.border}" stroke-width="2" fill="none"/>`;
    }

    const textXOffset = config.showAvatar ? 70 : 20;

    // Repository name
    svg += `
    <!-- Repo Info -->
    <text x="${textXOffset}" y="38" class="title" font-size="16">${escapeXml(repo.full_name)}</text>
    <text x="${textXOffset}" y="56" class="subtitle" font-size="11">${escapeXml(truncateText(repo.description || 'No description', 60))}</text>`;

    // Stats
    if (config.showStats) {
        const statsY = 80;
        svg += `
    <!-- Stats -->
    <g transform="translate(${textXOffset}, ${statsY})">
        <!-- Stars -->
        <g>
            <svg class="icon" width="14" height="14" viewBox="0 0 16 16" x="0" y="-11">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
            </svg>
            <text x="18" y="0" class="stat-value" font-size="12">${formatNumber(repo.stargazers_count)}</text>
        </g>
        
        <!-- Forks -->
        <g transform="translate(70, 0)">
            <svg class="icon" width="14" height="14" viewBox="0 0 16 16" x="0" y="-11">
                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
            </svg>
            <text x="18" y="0" class="stat-value" font-size="12">${formatNumber(repo.forks_count)}</text>
        </g>
        
        <!-- Issues -->
        <g transform="translate(130, 0)">
            <svg class="icon" width="14" height="14" viewBox="0 0 16 16" x="0" y="-11">
                <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                <path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
            </svg>
            <text x="18" y="0" class="stat-value" font-size="12">${formatNumber(repo.open_issues_count)}</text>
        </g>
    </g>`;
        yOffset = 110;
    } else {
        yOffset = 75;
    }

    // Divider
    svg += `
    <line class="divider" x1="20" y1="${yOffset - 10}" x2="${width - 20}" y2="${yOffset - 10}"/>`;

    // Section title
    svg += `
    <!-- Commits Section -->
    <text x="20" y="${yOffset + 10}" class="title" font-size="12">Recent Commits</text>`;

    yOffset += 30;

    // Commits
    commits.forEach((commit, index) => {
        const message = commit.commit.message.split('\n')[0];
        const truncatedMessage = truncateText(message, Math.floor((width - 120) / 7));
        const sha = commit.sha.substring(0, 7);
        const date = new Date(commit.commit.author.date);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const author = commit.commit.author.name;

        svg += `
    <!-- Commit ${index + 1} -->
    <g transform="translate(20, ${yOffset + index * commitHeight})">
        <!-- Timeline dot -->
        <circle class="commit-dot" cx="8" cy="18" r="5"/>
        ${index < commits.length - 1 ? `<line class="commit-line" x1="8" y1="26" x2="8" y2="${commitHeight}"/>` : ''}
        
        <!-- SHA -->
        <text x="25" y="14" class="sha" font-size="10">${sha}</text>
        
        <!-- Message -->
        <text x="25" y="30" class="text" font-size="11">${escapeXml(truncatedMessage)}</text>
        
        <!-- Author & Date -->
        <text x="25" y="45" class="text-muted" font-size="9">${escapeXml(author)}${config.showDate ? ` · ${formattedDate}` : ''}</text>
    </g>`;
    });

    svg += `
</svg>`;

    return svg;
}

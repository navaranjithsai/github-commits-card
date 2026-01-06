import { describe, it, expect } from 'vitest';
import { generateSVG, renderError } from './generator';
import { CardConfig, GitHubData } from './types';

const mockData: GitHubData = {
    repo: {
        full_name: 'owner/repo',
        description: 'A test repository',
        owner: {
            login: 'owner',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4'
        },
        stargazers_count: 1234,
        forks_count: 567,
        open_issues_count: 89
    },
    commits: [
        {
            sha: 'abc1234567890',
            commit: {
                message: 'First commit message\n\nWith body',
                author: { name: 'Test Author', date: '2024-01-15T10:30:00Z' }
            }
        },
        {
            sha: 'def0987654321',
            commit: {
                message: 'Second commit',
                author: { name: 'Another Author', date: '2024-01-14T15:45:00Z' }
            }
        }
    ]
};

const defaultConfig: CardConfig = {
    username: 'owner',
    repo: 'repo',
    count: 2,
    width: 500,
    theme: 'dark',
    bg: '0d1117',
    border: '30363d',
    title: '58a6ff',
    text: 'e6edf3',
    subtext: '8b949e',
    accent: '238636',
    sha: '7ee787',
    font: 'jetbrains',
    radius: 10,
    borderWidth: 1,
    showIcons: true,
    showStats: true,
    showAvatar: true,
    showDate: true
};

describe('generateSVG', () => {
    it('should generate valid SVG', () => {
        const svg = generateSVG(mockData, defaultConfig);

        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
        expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('should include repository name', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('owner/repo');
    });

    it('should include repository description', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('A test repository');
    });

    it('should include commit messages', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('First commit message');
        expect(svg).toContain('Second commit');
    });

    it('should include shortened SHA hashes', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('abc1234'); // First 7 chars
        expect(svg).toContain('def0987');
    });

    it('should include author names', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('Test Author');
        expect(svg).toContain('Another Author');
    });

    it('should apply theme colors', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('#0d1117'); // bg
        expect(svg).toContain('#58a6ff'); // title
        expect(svg).toContain('#238636'); // accent
    });

    it('should include stats when showStats is true', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('1.2k'); // formatted stars
    });

    it('should hide stats when showStats is false', () => {
        const config = { ...defaultConfig, showStats: false };
        const svg = generateSVG(mockData, config);
        expect(svg).not.toContain('1.2k');
    });

    it('should include avatar when showAvatar is true', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('avatarClip');
        expect(svg).toContain(mockData.repo.owner.avatar_url);
    });

    it('should hide avatar when showAvatar is false', () => {
        const config = { ...defaultConfig, showAvatar: false };
        const svg = generateSVG(mockData, config);
        expect(svg).not.toContain(mockData.repo.owner.avatar_url);
    });

    it('should include dates when showDate is true', () => {
        const svg = generateSVG(mockData, defaultConfig);
        expect(svg).toContain('Jan 15');
    });

    it('should hide dates when showDate is false', () => {
        const config = { ...defaultConfig, showDate: false };
        const svg = generateSVG(mockData, config);
        expect(svg).not.toContain('Jan 15');
    });

    it('should respect width configuration', () => {
        const config = { ...defaultConfig, width: 600 };
        const svg = generateSVG(mockData, config);
        expect(svg).toContain('width="600"');
    });

    it('should respect border radius configuration', () => {
        const config = { ...defaultConfig, radius: 20 };
        const svg = generateSVG(mockData, config);
        expect(svg).toContain('rx="20"');
    });

    it('should escape special characters in commit messages', () => {
        const dataWithSpecialChars: GitHubData = {
            ...mockData,
            commits: [{
                sha: 'abc1234567890',
                commit: {
                    message: 'Fix <script> & "injection"',
                    author: { name: 'Author', date: '2024-01-15T10:30:00Z' }
                }
            }]
        };

        const svg = generateSVG(dataWithSpecialChars, defaultConfig);
        expect(svg).toContain('&lt;script&gt;');
        expect(svg).toContain('&amp;');
        expect(svg).toContain('&quot;injection&quot;');
    });
});

describe('renderError', () => {
    it('should generate error SVG', () => {
        const svg = renderError('Test error message');

        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
    });

    it('should include error message', () => {
        const svg = renderError('Repository not found');
        expect(svg).toContain('Repository not found');
    });

    it('should include error styling', () => {
        const svg = renderError('Error');
        expect(svg).toContain('#f85149'); // Error color
        expect(svg).toContain('Error');
    });

    it('should escape special characters in error message', () => {
        const svg = renderError('Error: <test> & "more"');
        expect(svg).toContain('&lt;test&gt;');
        expect(svg).toContain('&amp;');
    });
});

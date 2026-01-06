import { describe, it, expect, vi, beforeEach } from 'vitest';
import { escapeXml, truncateText, formatNumber, fetchGitHubData } from './utils';

describe('escapeXml', () => {
    it('should escape ampersand', () => {
        expect(escapeXml('foo & bar')).toBe('foo &amp; bar');
    });

    it('should escape less than', () => {
        expect(escapeXml('a < b')).toBe('a &lt; b');
    });

    it('should escape greater than', () => {
        expect(escapeXml('a > b')).toBe('a &gt; b');
    });

    it('should escape double quotes', () => {
        expect(escapeXml('say "hello"')).toBe('say &quot;hello&quot;');
    });

    it('should escape single quotes', () => {
        expect(escapeXml("it's")).toBe('it&apos;s');
    });

    it('should escape multiple special characters', () => {
        expect(escapeXml('<script>alert("xss")</script>')).toBe(
            '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
        );
    });

    it('should handle empty string', () => {
        expect(escapeXml('')).toBe('');
    });
});

describe('truncateText', () => {
    it('should return original text if shorter than maxLength', () => {
        expect(truncateText('hello', 10)).toBe('hello');
    });

    it('should return original text if equal to maxLength', () => {
        expect(truncateText('hello', 5)).toBe('hello');
    });

    it('should truncate and add ellipsis if longer than maxLength', () => {
        expect(truncateText('hello world', 8)).toBe('hello...');
    });

    it('should handle very short maxLength', () => {
        expect(truncateText('hello', 4)).toBe('h...');
    });

    it('should handle empty string', () => {
        expect(truncateText('', 10)).toBe('');
    });
});

describe('formatNumber', () => {
    it('should return number as-is for values under 1000', () => {
        expect(formatNumber(0)).toBe('0');
        expect(formatNumber(999)).toBe('999');
        expect(formatNumber(1)).toBe('1');
    });

    it('should format thousands with k suffix', () => {
        expect(formatNumber(1000)).toBe('1.0k');
        expect(formatNumber(1500)).toBe('1.5k');
        expect(formatNumber(99999)).toBe('100.0k');
    });

    it('should format millions with M suffix', () => {
        expect(formatNumber(1000000)).toBe('1.0M');
        expect(formatNumber(2500000)).toBe('2.5M');
    });
});

describe('fetchGitHubData', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should fetch repo and commits data', async () => {
        const mockRepo = {
            full_name: 'owner/repo',
            description: 'Test repo',
            owner: { login: 'owner', avatar_url: 'https://example.com/avatar.png' },
            stargazers_count: 100,
            forks_count: 50,
            open_issues_count: 10
        };

        const mockCommits = [
            {
                sha: 'abc123',
                commit: {
                    message: 'Test commit',
                    author: { name: 'Author', date: '2024-01-01T00:00:00Z' }
                }
            }
        ];

        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockRepo)
            } as Response)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockCommits)
            } as Response);

        const result = await fetchGitHubData('owner', 'repo', 1);

        expect(result.repo).toEqual(mockRepo);
        expect(result.commits).toEqual(mockCommits);
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error for non-existent repo', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: false,
            status: 404
        } as Response);

        await expect(fetchGitHubData('owner', 'nonexistent', 1))
            .rejects.toThrow('Repository not found: owner/nonexistent');
    });

    it('should throw error on rate limit', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: false,
            status: 403
        } as Response);

        await expect(fetchGitHubData('owner', 'repo', 1))
            .rejects.toThrow('Rate limit exceeded');
    });

    it('should include auth header when token provided', async () => {
        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({})
            } as Response)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([])
            } as Response);

        await fetchGitHubData('owner', 'repo', 1, 'test-token');

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'token test-token'
                })
            })
        );
    });
});

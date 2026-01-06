import { describe, it, expect } from 'vitest';
import { themes } from './themes';

describe('themes', () => {
    it('should have dark theme defined', () => {
        expect(themes.dark).toBeDefined();
        expect(themes.dark.bg).toBe('0d1117');
        expect(themes.dark.title).toBe('58a6ff');
    });

    it('should have light theme defined', () => {
        expect(themes.light).toBeDefined();
        expect(themes.light.bg).toBe('ffffff');
        expect(themes.light.title).toBe('0969da');
    });

    it('should have all required color properties for each theme', () => {
        const requiredProps = ['bg', 'border', 'title', 'text', 'subtext', 'accent', 'sha'];

        Object.entries(themes).forEach(([themeName, theme]) => {
            requiredProps.forEach(prop => {
                expect(theme[prop as keyof typeof theme],
                    `Theme ${themeName} missing ${prop}`).toBeDefined();
                expect(typeof theme[prop as keyof typeof theme]).toBe('string');
            });
        });
    });

    it('should have exactly 12 themes', () => {
        const themeCount = Object.keys(themes).length;
        expect(themeCount).toBe(12);
    });

    it('should have valid hex colors (6 characters)', () => {
        const hexRegex = /^[0-9a-fA-F]{6}$/;

        Object.entries(themes).forEach(([themeName, theme]) => {
            Object.entries(theme).forEach(([colorName, colorValue]) => {
                expect(hexRegex.test(colorValue),
                    `Theme ${themeName}.${colorName} = ${colorValue} is not valid hex`).toBe(true);
            });
        });
    });

    const expectedThemes = [
        'dark', 'light', 'github_dark', 'github_light', 'dracula',
        'nord', 'monokai', 'tokyo_night', 'catppuccin', 'gruvbox',
        'one_dark', 'synthwave'
    ];

    expectedThemes.forEach(themeName => {
        it(`should have ${themeName} theme`, () => {
            expect(themes[themeName]).toBeDefined();
        });
    });
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.test.ts', 'api/**/*.test.ts', 'workers/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.ts', 'api/**/*.ts', 'workers/**/*.ts'],
            exclude: ['**/*.test.ts', '**/types.ts']
        }
    }
});

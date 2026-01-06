# Contributing to GitHub Commits Card

First off, thank you for considering contributing to GitHub Commits Card! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Adding New Features](#adding-new-features)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/github-commits-card.git
   cd github-commits-card
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/navaranjithsai/github-commits-card.git
   ```

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Installation

```bash
# Install dependencies
npm install

# Run tests to verify setup
npm test

# Start Vercel development server
npx vercel dev

# OR start Cloudflare Workers development server
npm run cf:dev
```

### Project Structure

```
github-commits-card/
├── api/                 # Vercel serverless function
├── workers/             # Cloudflare Workers entry point
├── src/                 # Shared source code
│   ├── types.ts         # TypeScript interfaces
│   ├── themes.ts        # Theme definitions
│   ├── fonts.ts         # Font configurations
│   ├── generator.ts     # SVG generation logic
│   ├── utils.ts         # Utility functions
│   └── *.test.ts        # Test files
├── public/              # Static files
└── .github/workflows/   # CI/CD pipelines
```

## Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** and ensure they follow our style guidelines

3. **Write or update tests** for your changes

4. **Run the test suite**:
   ```bash
   npm test
   ```

5. **Run the linter**:
   ```bash
   npm run lint
   ```

## Submitting a Pull Request

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** from your fork to the main repository

3. **Fill out the PR template** with:
   - A clear description of the changes
   - Related issue numbers (if any)
   - Screenshots for UI changes
   - Testing steps

4. **Wait for review** and address any feedback

## Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Export types from `src/types.ts`
- Use explicit return types for functions

### Code Style

- Use 4-space indentation
- Use single quotes for strings
- Add trailing commas in multi-line arrays/objects
- Write descriptive variable and function names

### SVG Generation

- Always escape user input with `escapeXml()`
- Use `truncateText()` for long strings
- Follow existing theme color patterns

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Place test files next to the source files (`*.test.ts`)
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies (GitHub API)

### Test Coverage

We aim for high test coverage. Please ensure:
- New functions have corresponding tests
- Edge cases are covered
- Error handling is tested

## Adding New Features

### Adding a New Theme

1. Edit `src/themes.ts`
2. Add your theme object with all required color properties:
   ```typescript
   your_theme: {
       bg: 'XXXXXX',
       border: 'XXXXXX',
       title: 'XXXXXX',
       text: 'XXXXXX',
       subtext: 'XXXXXX',
       accent: 'XXXXXX',
       sha: 'XXXXXX'
   }
   ```
3. Add tests in `src/themes.test.ts`
4. Update `README.md` with the new theme
5. Add a preview image if possible

### Adding a New Font

1. Edit `src/fonts.ts`
2. Add the font family string
3. Update `README.md`

### Adding API Parameters

1. Update TypeScript interfaces in `src/types.ts`
2. Add parameter parsing in both:
   - `api/index.ts` (Vercel)
   - `workers/index.ts` (Cloudflare Workers)
3. Update `src/generator.ts` if needed
4. Add tests for the new parameter
5. Update `README.md` with documentation

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion in GitHub Discussions
- Reach out to maintainers

Thank you for contributing! 🙏

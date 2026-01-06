// TypeScript interfaces for GitHub Commits Card

export interface Theme {
    bg: string;
    border: string;
    title: string;
    text: string;
    subtext: string;
    accent: string;
    sha: string;
}

export interface Themes {
    [key: string]: Theme;
}

export interface CardConfig {
    username: string;
    repo: string;
    count: number;
    width: number;
    theme: string;
    bg: string;
    border: string;
    title: string;
    text: string;
    subtext: string;
    accent: string;
    sha: string;
    font: string;
    radius: number;
    borderWidth: number;
    showIcons: boolean;
    showStats: boolean;
    showAvatar: boolean;
    showDate: boolean;
}

export interface GitHubOwner {
    login: string;
    avatar_url: string;
}

export interface GitHubRepo {
    full_name: string;
    description: string | null;
    owner: GitHubOwner;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

export interface GitHubCommitAuthor {
    name: string;
    date: string;
}

export interface GitHubCommitDetails {
    message: string;
    author: GitHubCommitAuthor;
}

export interface GitHubCommit {
    sha: string;
    commit: GitHubCommitDetails;
}

export interface GitHubData {
    repo: GitHubRepo;
    commits: GitHubCommit[];
}

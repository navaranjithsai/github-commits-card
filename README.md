<div align="center">
  
# 📊 GitHub Commits Card

### Generate beautiful, embeddable SVG cards for your GitHub commit history

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com)

<br/>

<picture>
  <source
    srcset="https://github-commits-card.vercel.app/api?theme=dark&repo=next.js&u=vercel&count=3"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="https://github-commits-card.vercel.app/api?u=facebook&repo=react&theme=light"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src="https://github-commits-card.vercel.app/api?u=facebook&repo=react&theme=dark" alt="GitHub Commits Card Demo" />
</picture>

<br/>
<br/>

[View Demo](https://navaranjithsai.github.io/github-commits-card/) · [Report Bug](https://github.com/navaranjithsai/github-commits-card/issues) · [Request Feature](https://github.com/navaranjithsai/github-commits-card/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td>

🎨 **12+ Beautiful Themes**
- Dark, Light, Dracula, Nord, Tokyo Night, and more
- Full custom color support

</td>
<td>

📱 **Responsive Design**
- Adjustable width (300-800px)
- Clean, minimalist aesthetics

</td>
</tr>
<tr>
<td>

🔤 **Multiple Fonts**
- JetBrains Mono, Fira Code
- Source Code Pro, Cascadia Code

</td>
<td>

⚡ **Easy Integration**
- Simple URL-based API
- Works in any Markdown file

</td>
</tr>
<tr>
<td>

🌓 **Dark/Light Mode Support**
- Auto-switches with system preference
- Using HTML picture element

</td>
<td>

📊 **Rich Information**
- Repo stats (stars, forks, issues)
- Commit SHA, author, date, message

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Basic Usage

```markdown
![GitHub Commits](https://your-domain.com/api?u=navaranjithsai&repo=MailVoyage&count=2)
```

### Example

```markdown
![GitHub Commits](https://your-domain.com/api?u=facebook&repo=react&count=5&theme=dark)
```

### With Dark/Light Mode Support

```html
<picture>
  <source
    srcset="https://your-domain.com/api?u=facebook&repo=react&theme=dark"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="https://your-domain.com/api?u=facebook&repo=react&theme=light"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src="https://your-domain.com/api?u=facebook&repo=react" alt="GitHub Commits" />
</picture>
```

---

## 📖 API Reference

### Base URL

```
https://your-domain.com/
```

### Parameters

#### Required Parameters

| Parameter | Alias | Description | Example |
|-----------|-------|-------------|---------|
| `u` | `username` | GitHub username | `facebook` |
| `repo` | `r` | Repository name | `react` |

#### Optional Parameters

| Parameter | Alias | Default | Description |
|-----------|-------|---------|-------------|
| `count` | `c` | `5` | Number of commits to display (1-20) |
| `w` | `width` | `500` | Card width in pixels (300-800) |
| `theme` | - | `dark` | Theme preset name |
| `radius` | - | `10` | Border radius in pixels |
| `font` | - | `jetbrains` | Font family |

#### Display Toggles

| Parameter | Default | Description |
|-----------|---------|-------------|
| `icons` | `true` | Show/hide icons |
| `stats` | `true` | Show/hide repository stats |
| `avatar` | `true` | Show/hide user avatar |
| `date` | `true` | Show/hide commit dates |

#### Custom Colors (Hex without #)

| Parameter | Description | Example |
|-----------|-------------|---------|
| `bg` | Background color | `0d1117` |
| `border` | Border color | `30363d` |
| `title` | Title text color | `58a6ff` |
| `text` | Main text color | `e6edf3` |
| `accent` | Accent color (dots, highlights) | `238636` |

---

## 🎨 Themes

### Available Themes

<table>
<tr>
<td align="center">

**🌙 dark**
<br/>
<img src="https://via.placeholder.com/100x60/0d1117/58a6ff?text=Dark" alt="dark theme"/>

</td>
<td align="center">

**☀️ light**
<br/>
<img src="https://via.placeholder.com/100x60/ffffff/0969da?text=Light" alt="light theme"/>

</td>
<td align="center">

**🧛 dracula**
<br/>
<img src="https://via.placeholder.com/100x60/282a36/ff79c6?text=Dracula" alt="dracula theme"/>

</td>
<td align="center">

**❄️ nord**
<br/>
<img src="https://via.placeholder.com/100x60/2e3440/88c0d0?text=Nord" alt="nord theme"/>

</td>
</tr>
<tr>
<td align="center">

**🌃 tokyo_night**
<br/>
<img src="https://via.placeholder.com/100x60/1a1b26/7aa2f7?text=Tokyo" alt="tokyo night theme"/>

</td>
<td align="center">

**🐱 catppuccin**
<br/>
<img src="https://via.placeholder.com/100x60/1e1e2e/cba6f7?text=Catppuccin" alt="catppuccin theme"/>

</td>
<td align="center">

**🎨 monokai**
<br/>
<img src="https://via.placeholder.com/100x60/272822/f92672?text=Monokai" alt="monokai theme"/>

</td>
<td align="center">

**🟫 gruvbox**
<br/>
<img src="https://via.placeholder.com/100x60/282828/fabd2f?text=Gruvbox" alt="gruvbox theme"/>

</td>
</tr>
<tr>
<td align="center">

**⚫ one_dark**
<br/>
<img src="https://via.placeholder.com/100x60/282c34/61afef?text=OneDark" alt="one dark theme"/>

</td>
<td align="center">

**🌈 synthwave**
<br/>
<img src="https://via.placeholder.com/100x60/2b213a/e92efb?text=Synthwave" alt="synthwave theme"/>

</td>
<td align="center">

**🐙 github_dark**
<br/>
<img src="https://via.placeholder.com/100x60/0d1117/58a6ff?text=GH+Dark" alt="github dark theme"/>

</td>
<td align="center">

**🐙 github_light**
<br/>
<img src="https://via.placeholder.com/100x60/ffffff/0969da?text=GH+Light" alt="github light theme"/>

</td>
</tr>
</table>

### Theme Usage

```markdown
![Commits](https://your-domain.com/?u=user&repo=project&theme=dracula)
```

---

## 🔤 Fonts

| Font ID | Font Name | Preview |
|---------|-----------|---------|
| `jetbrains` | JetBrains Mono | `const commit = "Hello"` |
| `fira` | Fira Code | `const commit = "Hello"` |
| `source` | Source Code Pro | `const commit = "Hello"` |
| `cascadia` | Cascadia Code | `const commit = "Hello"` |
| `ubuntu` | Ubuntu Mono | `const commit = "Hello"` |
| `inter` | Inter | `const commit = "Hello"` |

### Font Usage

```markdown
![Commits](https://your-domain.com/?u=user&repo=project&font=fira)
```

---

## 📚 Examples

### Minimal Card

```markdown
![Commits](https://your-domain.com/?u=vercel&repo=next.js&stats=false&avatar=false)
```

### Wide Card with More Commits

```markdown
![Commits](https://your-domain.com/?u=microsoft&repo=vscode&count=10&w=700)
```

### Custom Themed Card

```markdown
![Commits](https://your-domain.com/?u=torvalds&repo=linux&bg=1a1a2e&title=e94560&text=eaeaea&accent=0f3460)
```

### Dracula Theme with Fira Code

```markdown
![Commits](https://your-domain.com/?u=gothinkster&repo=realworld&theme=dracula&font=fira)
```

### Full Responsive Example

```html
<p align="center">
  <picture>
    <source
      srcset="https://your-domain.com/api?u=facebook&repo=react&theme=tokyo_night&count=7"
      media="(prefers-color-scheme: dark)"
    />
    <source
      srcset="https://your-domain.com/api?u=facebook&repo=react&theme=github_light&count=7"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
    />
    <img 
      src="https://your-domain.com/api?u=facebook&repo=react&theme=github_light&count=7" 
      alt="React Commits"
      width="500"
    />
  </picture>
</p>
```

---

## 🛠️ Self-Hosting

### Option 1: Vercel (Recommended)

1. **Fork this repository**

2. **Deploy to Vercel**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/navaranjithsai/github-commits-card)

3. **Set Environment Variables** (Optional)
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   ```
   > Adding a GitHub token increases rate limits from 60 to 5000 requests/hour

4. **Use your deployed URL**
   ```markdown
   ![Commits](https://your-app.vercel.app/?u=username&repo=repo)
   ```

### Option 2: Docker

```bash
# Clone the repository
git clone https://github.com/navaranjithsai/github-commits-card.git
cd github-commits-card

# Build Docker image
docker build -t github-commits-card .

# Run container
docker run -p 3000:3000 -e GITHUB_TOKEN=your_token github-commits-card
```

### Option 3: Node.js

```bash
# Clone and install
git clone https://github.com/navaranjithsai/github-commits-card.git
cd github-commits-card
npm install

# Set environment variable (optional, for higher rate limits)
export GITHUB_TOKEN=your_github_token

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
github-commits-card/
├── api/
│   └── index.ts         # Vercel serverless function (TypeScript)
├── src/
│   ├── types.ts         # TypeScript interfaces
│   ├── themes.ts        # Theme definitions
│   ├── fonts.ts         # Font configurations
│   ├── generator.ts     # SVG generation logic
│   └── utils.ts         # Utility functions
├── public/
│   └── index.html       # Card generator UI
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | Personal access token for higher rate limits |
| `CACHE_SECONDS` | No | Cache duration (default: 1800) |

### Creating a GitHub Token

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scope: `public_repo` (for public repositories only)
4. Copy the token and add it to your environment variables

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**

2. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Adding a New Theme

1. Open `src/themes.js`
2. Add your theme following this format:
   ```javascript
   your_theme: {
       bg: 'background_hex',
       border: 'border_hex',
       title: 'title_hex',
       text: 'text_hex',
       subtext: 'subtext_hex',
       accent: 'accent_hex',
       sha: 'sha_hex'
   }
   ```
3. Submit a PR!

---

## 📈 Rate Limits

| Type | Requests/Hour |
|------|---------------|
| Without Token | 60 |
| With Token | 5,000 |

> **Note:** Cards are cached for 30 minutes to minimize API calls

---

## 🐛 Troubleshooting

<details>
<summary><b>Card not showing in README</b></summary>

- Ensure the repository is public
- Check if the username and repo name are correct
- Verify the deployed URL is accessible

</details>

<details>
<summary><b>Rate limit exceeded</b></summary>

- Add a `GITHUB_TOKEN` environment variable
- Wait for the rate limit to reset (1 hour)

</details>

<details>
<summary><b>Fonts not rendering correctly</b></summary>

- Some email clients and older browsers may not support web fonts
- The card falls back to system monospace fonts

</details>

<details>
<summary><b>Custom colors not working</b></summary>

- Ensure hex colors are provided without the `#` symbol
- Example: `bg=0d1117` not `bg=#0d1117`

</details>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- Theme colors from popular code editor themes
- Icons from [GitHub Octicons](https://primer.style/octicons/)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

<div align="center">

### Made with ❤️ by developers, for developers

[⬆ Back to Top](#-github-commits-card)

</div>
```

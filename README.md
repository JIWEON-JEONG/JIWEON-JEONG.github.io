# WPTI Blog

A modern React blog with Hashnode integration, built for GitHub Pages.

## Features

- 🚀 **Modern Stack**: React 18, TypeScript, TanStack Router
- 📝 **Hashnode Integration**: Display your Hashnode content with custom design
- 🎨 **Clean UI**: Responsive, dark/light mode, mobile-first
- ⚡ **Fast**: Static generation, optimized for performance
- 🔐 **Secure**: Read-only deployment, no sensitive data exposed

## Quick Start

```bash
git clone https://github.com/Q00/Q00.github.io.git
cd Q00.github.io
pnpm install
cp .env.local.example .env.local
pnpm dev
```

Visit `http://localhost:5173`

## Environment Setup

```bash
# .env.local for development
VITE_HASHNODE_ENABLED=true
VITE_HASHNODE_PUBLICATION_ID=your_publication_id
VITE_HASHNODE_PUBLICATION_HOST=yourblog.hashnode.dev
```

## Deployment

Deploy to GitHub Pages automatically via GitHub Actions.

**Required Repository Secrets:**

- `HASHNODE_PUBLICATION_ID`
- `HASHNODE_PUBLICATION_HOST`

Push to `master` or `main` branch to trigger deployment.

## Tech Stack

- React 18 + TypeScript
- TanStack Router
- Tailwind CSS
- Vite
- GitHub Pages
- GitHub Actions

## License

MIT License

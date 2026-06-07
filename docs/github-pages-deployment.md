# GitHub Pages Deployment Guide

Complete guide for deploying Q00 Blog to GitHub Pages with automatic CI/CD.

## Overview

GitHub Pages provides free hosting for static websites directly from your GitHub repository. This guide covers both Hashnode-integrated and file-based deployments.

## Prerequisites

- GitHub repository for your blog
- GitHub account with Pages enabled
- Basic knowledge of GitHub Actions

## Deployment Options

### Option 1: Hashnode Integration (Recommended)

Perfect for displaying your Hashnode content with a custom frontend.

#### Step 1: Repository Setup

1. Fork or clone the Q00 Blog repository
2. Enable GitHub Pages in repository settings:
   - Go to **Settings** → **Pages**
   - Source: **GitHub Actions**

#### Step 2: Configure Repository Secrets

Add these secrets in **Settings** → **Secrets and variables** → **Actions**:

```
HASHNODE_PUBLICATION_ID=your_publication_id
HASHNODE_PUBLICATION_HOST=yourblog.hashnode.dev
```

**Note:** Never add `HASHNODE_API_TOKEN` to repository secrets as it provides write access.

#### Step 3: GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  schedule:
    # Rebuild daily at 6 AM UTC to fetch new Hashnode content
    - cron: "0 6 * * *"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          VITE_HASHNODE_ENABLED: true
          VITE_HASHNODE_PUBLICATION_ID: ${{ secrets.HASHNODE_PUBLICATION_ID }}
          VITE_HASHNODE_PUBLICATION_HOST: ${{ secrets.HASHNODE_PUBLICATION_HOST }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./apps/blog/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Step 4: Custom Domain (Optional)

1. Add `CNAME` file to `apps/blog/public/`:
   ```
   yourdomain.com
   ```

2. Configure DNS records:
   ```
   CNAME    www    username.github.io
   A        @      185.199.108.153
   A        @      185.199.109.153
   A        @      185.199.110.153
   A        @      185.199.111.153
   ```

### Option 2: File-Based Content

For blogs using markdown files in the repository.

#### Step 1: Content Structure

Organize your content:
```
content/
├── posts/
│   ├── 2024-01-15-my-first-post.md
│   └── 2024-01-20-second-post.md
└── pages/
    └── about.md
```

#### Step 2: GitHub Actions Workflow

```yaml
name: Deploy File-Based Blog

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build content
        run: pnpm build:content

      - name: Build application
        run: pnpm build
        env:
          VITE_HASHNODE_ENABLED: false

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./apps/blog/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Configuration Options

### Environment Variables

| Variable | Required | Description | Safe for Pages |
|----------|----------|-------------|----------------|
| `VITE_HASHNODE_ENABLED` | Yes | Enable Hashnode integration | ✅ |
| `VITE_HASHNODE_PUBLICATION_ID` | Yes* | Hashnode publication ID | ✅ |
| `VITE_HASHNODE_PUBLICATION_HOST` | Yes* | Publication domain | ✅ |
| `VITE_HASHNODE_API_TOKEN` | No | Write access token | ❌ Never |

*Required only when `VITE_HASHNODE_ENABLED=true`

### Performance Optimization

1. **Enable caching** in workflow:
   ```yaml
   - name: Cache build
     uses: actions/cache@v4
     with:
       path: |
         ~/.pnpm-store
         **/node_modules
       key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
   ```

2. **Scheduled rebuilds** for Hashnode content:
   ```yaml
   schedule:
     - cron: "0 6 * * *"  # Daily at 6 AM UTC
   ```

## Security Best Practices

### ✅ Do This

- Use repository secrets for sensitive data
- Only expose public Hashnode identifiers
- Use HTTPS for custom domains
- Enable branch protection rules

### ❌ Never Do This

- Commit API tokens to repository
- Enable admin features in public deployments
- Expose write access credentials
- Use HTTP for custom domains

## Troubleshooting

### Build Failures

**Issue**: `pnpm command not found`
**Solution**: Ensure pnpm action is included before Node.js setup

**Issue**: `Module not found` errors
**Solution**: Clear cache and reinstall dependencies:
```yaml
- name: Clear cache
  run: rm -rf node_modules .pnpm-store
```

### Deployment Issues

**Issue**: 404 errors on refresh
**Solution**: Add `_redirects` file to handle SPA routing:
```
/*    /index.html   200
```

**Issue**: Custom domain not working
**Solution**: Verify DNS settings and CNAME file placement

### Hashnode Integration Issues

**Issue**: No posts loading
**Solution**: Check publication ID and host configuration

**Issue**: API rate limiting
**Solution**: Implement caching or reduce build frequency

## Advanced Configuration

### Multi-Environment Deployment

Deploy to staging and production:

```yaml
jobs:
  build-staging:
    if: github.ref == 'refs/heads/develop'
    # ... staging build steps

  build-production:
    if: github.ref == 'refs/heads/main'
    # ... production build steps
```

### Content Preview

Enable preview builds for pull requests:

```yaml
on:
  pull_request:
    branches: [ main ]

jobs:
  preview:
    if: github.event_name == 'pull_request'
    # ... preview build steps
```

## Support

For issues with this deployment guide:
1. Check GitHub Actions logs
2. Review repository settings
3. Verify DNS configuration
4. Open issue on project repository

---

**Happy deploying!** 🚀

Your blog will be available at `https://username.github.io/repository-name` or your custom domain.
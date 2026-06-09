# 정지원의 기록

A personal blog built with React + Vite + TailwindCSS, deployed on GitHub Pages.

## Tech Stack

- React 18 + TypeScript
- TanStack Router
- Tailwind CSS
- Vite
- GitHub Actions + GitHub Pages

## Quick Start

```bash
git clone https://github.com/JIWEON-JEONG/JIWEON-JEONG.github.io.git
cd JIWEON-JEONG.github.io
pnpm install
pnpm dev
```

Visit `http://localhost:5173`

## Adding a New Post

`apps/blog/content/` 디렉토리에 마크다운 파일을 추가하면 됩니다.

```markdown
---
title: "포스트 제목"
datePublished: 2026-01-01
slug: post-slug
tags: Spring, Backend
seoDescription: "포스트 요약"
---

본문 내용...
```

## Deployment

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 후 `gh-pages` 브랜치에 배포합니다.

GitHub 레포 Settings → Pages → Source를 `gh-pages` 브랜치로 설정해야 합니다.

## License

MIT License

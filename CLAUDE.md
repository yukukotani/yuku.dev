# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

### 開発
```bash
pnpm dev          # 開発サーバーを起動 (http://localhost:4321)
pnpm build        # 本番用ビルド
pnpm format       # Prettierでコード整形
```

## アーキテクチャ概要

このプロジェクトは、Astroベースの個人ブログサイトで、3つの異なるソースから記事を統合して表示します。

### 記事ソース

1. **内部記事** (`src/pages/articles/YYYY-MM-DD/*.md`)
   - Markdownファイルで直接管理
   - frontmatter必須: `title`, `description`, `publishDate`
   - ArticleLayoutでレンダリング

2. **Zenn記事** (外部API)
   - 個人記事: `fetchYukuZennArticles()` - yukukotaniアカウントの記事
   - Ubie記事: `fetchUbieZennArticles()` - 特定slugの記事を取得

3. **Note記事** (外部API)
   - `fetchNoteArticles()` - yukukotaniアカウントの記事を取得

### 重要な実装パターン

- **記事の統合**: `src/pages/index.astro`で全ソースの記事を取得し、日付順にソート
- **日付ベースURL**: 内部記事は `/articles/YYYY-MM-DD/slug` 形式
- **Content Collections**: 微分積分ノート (`src/content/calculus-2024/`) はAstroのContent Collections機能を使用
- **スタイリング**: CSS Modules (`*.module.scss`) でコンポーネントごとにスコープ化

### Markdown拡張

- GitHub Flavored Markdown (remark-gfm)
- 数式サポート (remark-math + rehype-katex)
- 外部リンクは自動的に新規タブで開く
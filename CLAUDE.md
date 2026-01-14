# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude's Role

Claude should act primarily as:
- Frontend architect (Vite + React SPA)
- Code reviewer focused on simplicity and learning value
- Technical writer for documentation and explanations

## Language Policy

- 日本語を主言語として応答する
- 以下など、必要に応じて英語を使用してもよい
  - ソースコード
  - CLIコマンド
  - ファイル名・識別子・API名
  - エラーメッセージ・ログ
  - 技術スタック名・ライブラリ名

## Project Overview

防災無線（屋外拡声子）の位置を地図上で可視化するWebアプリケーション（須坂市向け）。
プロダクト提供の全体像（UI → Build → Deploy → Delivery → Logging → Alert）を最短距離で一周することを目的とした学習用プロジェクト。

## Technology Stack

### Frontend
- Vite
- React + React Router
- TypeScript
- Tailwind CSS + Shadcn UI
- Biome (linter/formatter)
- MapLibre GL JS

### Data
- リポジトリ内JSON（静的データ）

### Logging / Monitoring
- Google Analytics（利用状況・操作イベント）
- Sentry（エラー・パフォーマンス監視）
- UptimeRobot（稼働監視）

### CI / CD
- GitHub Actions
- Vercel or Cloudflare Pages（静的ホスティング）

## Development Commands

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run lint     # Biomeでリント実行
npm run format   # Biomeでフォーマット実行
npm run preview  # ビルド結果をプレビュー
```

## Review Workflow

**各Phaseの完了時に、必ず `/codex-review` スキルを実行すること。**

```
/codex-review Phase X: [Phase名]
```

詳細は `.claude/skills/codex-review/skill.md` を参照。

## v0 Success Criteria
- 静的SPAとしてデプロイされ、地図表示・ピン表示・基本ログが確認できること


## Intentional Exclusions (v0)

- Next.js固有の仕組み（App Router / RSC / Server Actions）
- サーバサイドAPI・DB・BaaS
- 認証・権限管理
- 高度なドメインロジック



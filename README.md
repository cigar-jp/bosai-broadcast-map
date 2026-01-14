# bosai-broadcast-map

防災無線（屋外拡声子）の位置を地図上で可視化し、  
「自分の住んでいる／住もうとしている場所の近くに、防災無線がどれくらいあるか」  
を把握できるようにするための Web アプリケーション。

本リポジトリは **プロダクト提供の全体像（UI → Build → Deploy → Delivery → Logging → Alert）**  
を **最短距離で一周すること** を主目的とした学習用プロジェクトです。

---

## 🎯 対象スコープ（v0）
- 地域：須坂市
- 対象ユーザー：  
  新規住宅購入・引っ越しを検討している一般住民
- 課題意識：  
  「防災無線が近すぎて生活音として気にならないか？」

---

## 🧩 v0でやること
- 地図表示（MapLibre を利用）
- 防災無線スピーカーの位置をピン表示（リポジトリ内JSON）
- ピン一覧表示
- ピン詳細表示
- ユーザー操作に関するイベントログ送信
- 稼働監視・エラー検知（最小構成）

※ 投票、音声解析、リアルタイム配信、認証、DB は v0 では行わない

---

## 🏗 技術スタック（v0確定）
### Frontend
- Vite
- React
- React Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Biome
- MapLibre GL JS

### Data
- リポジトリ内 JSON（手入力・静的データ）

### Logging / Monitoring
- Google Analytics（利用状況・操作イベント）
- Sentry（エラー・パフォーマンス監視）

### Alert
- Uptime 監視（UptimeRobot 等）
- Sentry アラート

### CI / CD
- GitHub Actions
- Vercel or Cloudflare Pages（静的ホスティング）

---

## 📈 学習ゴール
- UI → Build → Deploy → Delivery（静的配信） → Logging → Alert  
  の流れを自分の言葉で説明できる
- SPA構成におけるログ・監視・アラートの役割を説明できる
- フロントエンドエンジニアとして  
  **「届けて・動かして・守る」** 視点を持つ

---

## 🧠 v0で意図的にやらないこと
- Next.js 固有の仕組み（App Router / RSC / Server Actions）
- サーバサイドAPI・DB・BaaS（Firebase / Supabase 等）
- 認証・権限管理
- 高度なドメインロジック

※ v0では「正しさ」よりも **完成させて一周すること** を優先する

---

## 🚧 ステータス
- v0：環境構築・最小機能実装中

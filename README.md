# bosai-broadcast-map

防災無線（屋外拡声子）の位置を地図上で可視化し、  
「自分の住んでいる／住もうとしている場所の近くに、防災無線がどれくらいあるか」  
を把握できるようにするための Web アプリケーションです。

本リポジトリは **UI → Build → Deploy → Delivery → Logging → Alert** を最短距離で一周することを目的とした学習用プロジェクトです。

---

## 対象スコープ（v0）

- 地域: 須坂市
- 対象ユーザー: 新規住宅購入・引っ越しを検討している一般住民
- 主な機能:
  - 地図表示（MapLibre）
  - 防災無線スピーカーのピン表示
  - 一覧表示と詳細表示
  - ユーザー操作イベントの計測
  - エラー監視の最小構成

---

## 技術スタック

- Vite
- React
- React Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Biome
- MapLibre GL JS
- Google Analytics 4
- Sentry
- GitHub Actions
- Vercel

---

## ローカル開発

1. 依存関係をインストールする

   ```bash
   npm install
   ```

2. 必要に応じて環境変数ファイルを作成する

   ```bash
   cp .env.example .env.local
   ```

   PowerShell の場合:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. 開発サーバーを起動する

   ```bash
   npm run dev
   ```

### 利用コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run lint` | Biome で静的チェック |
| `npm run test:run` | Vitest を一度実行 |
| `npm run build` | 本番ビルドを生成 |
| `npm run preview` | build 済み成果物をローカル確認 |

---

## 環境変数

`.env.example` にサンプルがあります。未設定でもアプリは起動しますが、GA と Sentry は無効になります。

| 変数名 | 用途 |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 の Measurement ID |
| `VITE_SENTRY_DSN` | Sentry Browser SDK 用 DSN |

---

## Vercel へのデプロイ

1. Vercel にこのリポジトリを Import する
2. Framework Preset は **Vite** を選ぶ
3. Build Command を `npm run build` にする
4. Output Directory を `dist` にする
5. 必要なら Environment Variables に以下を設定する
   - `VITE_GA_MEASUREMENT_ID`
   - `VITE_SENTRY_DSN`
6. Deploy を実行する

初回デプロイ後は、公開 URL で地図表示・一覧表示・ピンクリック・一覧クリックを確認してください。

---

## 今回の v0 でやらないこと

- Next.js 固有機能
- サーバサイド API / DB / BaaS
- 認証・権限管理
- 高度なドメインロジック

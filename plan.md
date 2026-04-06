# デプロイ到達プラン

## 目的

現状の実装を「ひとまず公開できる状態」まで持っていく。今回は機能追加よりも、CI を通し、公開設定を揃え、URL で動作確認できるところまでを優先する。

## 現状確認（2026-04-06 時点）

| 項目 | 状態 | メモ |
| --- | --- | --- |
| Build | OK | `npm run build` は成功。`dist/assets/index-*.js` に 500kB 超の chunk warning あり |
| Test | OK | `npm run test:run` は 27 件成功 |
| Lint | NG | `biome.json` の schema `2.3.11` と実行中の CLI `2.4.9` が不一致。`src/components/ui/card.tsx` の import/export 並び順エラーもある |
| UI/機能 | OK | 地図表示 / 一覧表示 / ポップアップ / 一覧からのフォーカス連携まで実装済み |
| 計測/監視 | 一部完了 | GA / Sentry の初期化コードと `.env.example` はあるが、本番設定は未投入 |
| 公開準備 | 未完了 | `index.html` が Vite 初期値のまま。ホスティング未接続 |

## 方針

- 初回リリースは「静的 SPA を安定して公開する」ことを優先する
- ホスティングは **Vercel を第一候補** にする（Cloudflare Pages でも代替可能）
- UptimeRobot やアラート運用は **初回デプロイ後の次フェーズ** に回す
- bundle size warning は現時点では非ブロッカーとして扱い、初回公開後の改善候補に残す

## 実施ステップ

### Phase 1: CI を通る状態に戻す

1. `biome.json` の schema/version を実際の Biome CLI に合わせる、または依存バージョンを揃える
2. `src/components/ui/card.tsx` の import / export 並び順を修正する
3. `npm run lint`, `npm run test:run`, `npm run build` がローカルと CI の両方で通る状態にする

### Phase 2: 公開前の最低限の見た目と設定を整える

1. `index.html` の `lang`, `title`, favicon, description をアプリ向けに更新する
2. README に以下を追記する
   - ローカル起動手順
   - 環境変数の用途
   - 本番デプロイ時の設定値
3. `.env.example` と実コードの環境変数名が一致していることを確認する
4. GA / Sentry の env が未設定でもアプリが安全に起動する現在の挙動を維持する

### Phase 3: デプロイ先を接続する

1. Vercel にリポジトリを接続する
2. Build Command を `npm run build`、Output Directory を `dist` に設定する
3. `VITE_GA_MEASUREMENT_ID` と `VITE_SENTRY_DSN` を Vercel の Environment Variables に設定する
4. 必要なら preview / production の environment を分ける
5. React Router を `BrowserRouter` で使っているため、将来ルートを増やす場合は SPA fallback / rewrite を追加する  
   ※ 現在は `/` のみなので初回公開のブロッカーではない

### Phase 4: 公開確認

1. 本番 URL で以下を確認する
   - 地図が表示される
   - 一覧が表示される
   - 一覧クリックで地図が移動する
   - マーカークリックでポップアップが出る
2. GA を有効化する場合は pageview / click イベントが届くことを確認する
3. Sentry を有効化する場合はテスト用イベントまたは意図的な例外で通知を確認する
4. 公開 URL を README または repository description に反映する

## 完了条件

- CI が green である
- 本番 URL から地図機能を利用できる
- GA / Sentry を使う場合は env 設定が完了している
- 公開に必要な手順が README で追える

## デプロイ後の次フェーズ

- bundle size warning の解消（Sentry Replay / code splitting の見直し）
- UptimeRobot の監視追加
- Sentry / Uptime のアラート通知設定

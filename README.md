# bosai-broadcast-map

防災無線（屋外拡声子）の位置を地図上で可視化し、
「自分の住んでいる／住もうとしている場所の近くに、防災無線がどれくらいあるか」
を把握できるようにするための Web アプリケーション。

本リポジトリは **プロダクト提供の全体像（UI → Build → Deploy → Delivery → Logging → Alert）**
を学習・検証することを主目的とした学習用プロジェクトです。

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
- 防災無線スピーカーの位置をピン表示（手入力JSON）
- ピン一覧・ピン詳細表示
- 「この地点、聞こえる？」の簡易投票（Yes / No）
- Application Insights によるイベントログ送信

※ 音声解析・リアルタイム配信・認証は v0 では行わない

---

## 🏗 技術スタック（予定）
- Frontend
  - Next.js (App Router)
  - TypeScript
  - MapLibre GL JS
- CI / CD
  - GitHub Actions
  - Azure Static Web Apps
- Observability
  - Azure Application Insights
  - Azure Monitor / Alert

---

## 📈 学習ゴール
- UI から本番配信までの経路を自分の言葉で説明できる
- ビルド・デプロイ・配信・ログ・アラートの役割と改善点を説明できる
- フロントエンドエンジニアとして「届けて・動かして・守る」視点を持つ

---

## 🚧 ステータス
- v0：環境構築・最小機能実装中

---
name: codex-review
description: Phase完了時にOpenAI Codex CLIでコードレビューを実行。品質チェック、レビュー、修正ループを自動化。
---

# Codex Review Skill

## フロー

```
[Phase完了]
    ↓
[事前チェック] ← lint/build 失敗時は修正を促す
    ↓
[変更規模判定] → small/medium/large
    ↓
[Codexレビュー実行]
    ↓
[結果解析]
    ↓
[修正必要?] → Yes → [修正実施] → [再レビュー]
    ↓ No
[完了報告]
```

## 規模判定

| 規模 | 変更ファイル数 | 変更行数 | レビュー深度 |
|------|---------------|---------|-------------|
| small | 1-3 | ~100 | 簡易チェック |
| medium | 4-10 | ~500 | 標準レビュー |
| large | 11+ | 500+ | 詳細レビュー |

## 実行

```bash
# 基本実行
/codex-review [phase名]

# 例
/codex-review Phase 1: UI基盤
```

## 事前チェック

```bash
npm run lint
npm run build
```

失敗時の挙動:
- lint失敗 → `npm run format` を試行後、再lint
- build失敗 → エラー内容を報告し、修正を促す
- 両方成功 → レビューフェーズへ進む

## 修正ループ

```
[レビュー結果受領]
    ↓
[severity: high あり?] → Yes → [即時修正]
    ↓ No                           ↓
[severity: medium あり?] → Yes → [修正提案]
    ↓ No                           ↓
[完了]                      [ユーザー確認]
                                   ↓
                            [修正実施 or スキップ]
                                   ↓
                            [再レビュー or 完了]
```

最大修正ループ: 3回

## 出力スキーマ

```json
{
  "phase": "Phase 1: UI基盤",
  "timestamp": "2024-01-01T00:00:00Z",
  "files_reviewed": ["src/components/Map.tsx", "src/App.tsx"],
  "stats": {
    "files_changed": 5,
    "lines_added": 120,
    "lines_removed": 30
  },
  "findings": [
    {
      "severity": "high|medium|low",
      "category": "security|performance|quality|style",
      "file": "src/components/Map.tsx",
      "line": 42,
      "message": "指摘内容",
      "suggestion": "修正案"
    }
  ],
  "summary": {
    "high": 0,
    "medium": 2,
    "low": 5,
    "passed": true
  },
  "next_action": "proceed|fix_required|review_again"
}
```

## プロンプトテンプレート

### Small Review
```
以下の変更をレビューしてください（簡易チェック）:
Phase: {phase_name}
ファイル: {file_list}

確認ポイント:
- 明らかなバグ
- セキュリティ問題
- TypeScript型エラー
```

### Medium Review
```
以下の変更をレビューしてください（標準レビュー）:
Phase: {phase_name}
ファイル: {file_list}

確認ポイント:
1. コードの品質と可読性
2. TypeScript の型安全性
3. React のベストプラクティス
4. セキュリティ上の問題
5. パフォーマンスの懸念
```

### Large Review
```
以下の変更を詳細レビューしてください:
Phase: {phase_name}
ファイル: {file_list}
変更概要: {change_summary}

確認ポイント:
1. アーキテクチャの妥当性
2. コードの品質と可読性
3. TypeScript の型安全性
4. React のベストプラクティス
5. セキュリティ上の問題
6. パフォーマンスの懸念
7. テスタビリティ
8. 将来の拡張性
```

## パラメータ

| パラメータ | デフォルト | 説明 |
|-----------|-----------|------|
| max_retries | 3 | 修正ループの最大回数 |
| auto_fix | false | high severity を自動修正するか |
| skip_lint | false | 事前lintをスキップするか |
| verbose | false | 詳細ログを出力するか |

## エラーハンドリング

| エラー | 対応 |
|--------|------|
| codex CLI未インストール | インストール手順を案内 |
| API エラー | 3回リトライ後、手動レビューを提案 |
| git 未初期化 | `git init` を案内 |
| 変更なし | レビュー不要として完了 |

## 完了条件

- [ ] lint/build が成功
- [ ] severity: high の指摘が0件
- [ ] severity: medium の指摘が対応済み or 承認済み
- [ ] 出力スキーマに従った結果レポートを生成

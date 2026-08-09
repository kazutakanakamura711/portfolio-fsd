# MicroCMS

## スキーマと型定義

MicroCMSのAPIスキーマをJSONとしてエクスポートし、`cms-schemas/` に `api-{name}.json` の形式で配置します。

```bash
npm run generate:types
```

生成された型定義は `src/entities/microcms/{name}/` に出力されます。

## プロジェクトAPI

制作実績は `projects` APIで一元管理します。コンテンツの `type` は次のいずれかを設定します。

- `application`
- `work`
- `wordpress`
- `lp`

APIフィールドを変更した場合は、公開状態、APIプレビュー、実サイト表示を順に確認します。コンテンツAPIやフィールドを削除・変更する場合は、参照コード、スキーマのバックアップ、公開データを事前に確認してください。

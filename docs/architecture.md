# アーキテクチャ

このプロジェクトは [Feature-Sliced Design](https://feature-sliced.design/) に準拠した構成です。

```text
src/
├── app/          # プロバイダー・ルーティング・グローバルスタイル
├── pages/        # 各ページコンポーネント
├── widgets/      # ヘッダー・フッターなど複合UI
├── features/     # 機能単位のコンテナ・UI
├── entities/     # ドメインモデル（MicroCMS型定義など）
└── shared/       # 汎用UI・hooks・utils・assets
```

ページを追加した場合は、次の設定も更新します。

- `vite.config.ts` の `dynamicRoutes`
- `vercel.json` の `rewrites`
- 必要に応じてルーティング、ナビゲーション、サイトマップ関連の実装

# portfolio-fsd

React + TypeScript + Viteで構築したポートフォリオサイトです。

🔗 **https://portfolio.sakura-kn.com**

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

通常の画面開発は `npm run dev` で起動できます。チャット機能（`/api/chat`）をローカルで確認する場合は、Vercel Functionsも起動する次のコマンドを使用してください。

```bash
npm run dev:vercel
```

表示された `http://localhost:3000` をブラウザで開いて確認します。`GEMINI_API_KEY` はブラウザに公開せず、VercelのDevelopment環境変数として設定してください。

## ドキュメント

- [開発・コミット・PR・リリース運用](docs/CONTRIBUTING.md)
- [アーキテクチャとページ追加時の設定](docs/architecture.md)
- [MicroCMSのスキーマとプロジェクトAPI](docs/microcms.md)
- [環境変数・開発コマンド・デプロイ](docs/deployment.md)
- [AIエージェント向け指示](AGENTS.md)

## 主な技術

- React / TypeScript / Vite
- Tailwind CSS / shadcn/ui / React Router
- MicroCMS
- Vitest / Testing Library / Storybook
- Vercel

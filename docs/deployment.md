# セットアップとデプロイ

## ローカルセットアップ

Node.jsは `.nvmrc` の `24.22.1` を使用します。`nvm` を導入済みの場合は、次の手順で指定バージョンをインストール・使用します。

```bash
nvm install
nvm use
npm install
cp .env.example .env.local
```

`.env.local` に次の環境変数を設定します。

- `VITE_MICROCMS_SERVICE_DOMAIN`
- `VITE_MICROCMS_API_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_CONTACT_TO_EMAIL`（任意）
- `GEMINI_API_KEY`

## 開発コマンド

```bash
npm run dev
npm run build
npm run preview
npm run test:unit
npm run test:coverage
npm run storybook
npm run lint
npm run format
```

## GitHub Actions（ロリポップ向け）

`.github/workflows/deploy.yml` は `main` へのpushで起動し、依存関係のインストール、ユニットテスト、本番ビルドを実行して `dist/` をロリポップへFTPS転送します。

ビルド用Node.jsは `actions/setup-node` の `node-version-file: '.nvmrc'` で指定します。Actionsは `actions/checkout@v7.0.1`、`actions/setup-node@v7.1.0`、`SamKirkland/FTP-Deploy-Action@v4.4.0` を使用し、各Action自体の実行環境もNode.js 24に対応しています。

Node.jsを更新する場合は `.nvmrc` を変更し、依存関係のインストール、`npm run test:unit`、`npm run build`、`npm run lint` を確認してください。

## ブランチとVercel

通常は `develop` 向けPRをマージして動作確認し、リリース時に `develop` を `main` へマージします。`main` への反映後は、Vercelのデプロイ結果と本番サイトの主要ページを確認します。

VercelのNode.js設定は `24.x` を使用します。Vercel側のマイナー・パッチ更新はVercelが管理し、ローカル・GitHub Actions用の `.nvmrc` とは別に扱います。詳細は [VercelのNode.jsバージョン管理](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) を参照してください。

Vercelではローカルの `.env.production` ではなく、Project SettingsのEnvironment Variablesを使用します。`GEMINI_API_KEY` を含む必要な環境変数が登録されていることを確認してください。

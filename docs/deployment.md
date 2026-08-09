# セットアップとデプロイ

## ローカルセットアップ

```bash
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

## ブランチとVercel

通常は `develop` 向けPRをマージして動作確認し、リリース時に `develop` を `main` へマージします。`main` への反映後は、Vercelのデプロイ結果と本番サイトの主要ページを確認します。

Vercelではローカルの `.env.production` ではなく、Project SettingsのEnvironment Variablesを使用します。`GEMINI_API_KEY` を含む必要な環境変数が登録されていることを確認してください。

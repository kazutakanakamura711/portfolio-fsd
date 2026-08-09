# portfolio-fsd

ポートフォリオサイトです。  
React + TypeScript + Vite をベースに、Feature-Sliced Design（FSD）アーキテクチャで構築しています。

🔗 **https://portfolio.sakura-kn.com**

---

## ページ構成

| パス            | 内容                                                      |
| --------------- | --------------------------------------------------------- |
| `/`             | TOP — ヒーロー・プロフィール概要・主要コンテンツへの導線  |
| `/profile`      | PROFILE — 経歴・スキル詳細                                |
| `/applications` | APPLICATIONS — 制作したアプリの一覧（MicroCMS から取得）  |
| `/lp`           | LANDING PAGES — 制作したLPの一覧（MicroCMS から取得）     |
| `/works`        | WORKS — 実績・制作物の一覧（MicroCMS から取得）           |
| `/wordpress`    | WORDPRESS — WordPress 関連の実績一覧（MicroCMS から取得） |
| `/contact`      | CONTACT — お問い合わせフォーム（EmailJS 送信）            |

---

## 技術スタック

### フロントエンド

- **React 19** / **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** + shadcn/ui + Radix UI
- **React Router v7**
- **Embla Carousel**
- **Framer Motion**
- **Three.js**（@react-three/fiber / @react-three/drei）
- **EmailJS**（お問い合わせメール送信）

### AI / API

- **Gemini API**（@google/genai）
- **Vercel Serverless Functions**（`/api/chat`）

### CMS

- **MicroCMS** — projects APIによる制作実績の一元管理

### テスト

- **Vitest** + Testing Library（ユニットテスト）
- **Storybook 10** + Playwright（UIテスト）

### 品質管理

- ESLint + Prettier
- Husky + lint-staged（コミット前自動チェック）

### ビルド最適化

- **vite-plugin-image-optimizer**（sharp / svgo による画像圧縮）
- **vite-plugin-sitemap**（`sitemap.xml` / `robots.txt` 自動生成）
- MicroCMS Image API パラメータ（`?w=800&q=75&fm=webp`）による配信最適化

**ページを追加した際は `vite.config.ts` の `dynamicRoutes` と `vercel.json` の `rewrites` の両方にパスを追記してください。**

```ts
sitemap({
  hostname: 'https://portfolio.sakura-kn.com',
  dynamicRoutes: ['/', '/profile', '/applications', '/lp', '/works', '/wordpress', '/contact'],
}),
```

```json
{
  "rewrites": [
    { "source": "/profile", "destination": "/index.html" },
    { "source": "/applications", "destination": "/index.html" },
    { "source": "/lp", "destination": "/index.html" },
    { "source": "/works", "destination": "/index.html" },
    { "source": "/wordpress", "destination": "/index.html" },
    { "source": "/contact", "destination": "/index.html" }
  ]
}
```

---

## アーキテクチャ

[Feature-Sliced Design](https://feature-sliced.design/) に準拠したディレクトリ構成です。

```
src/
├── app/          # プロバイダー・ルーティング・グローバルスタイル
├── pages/        # 各ページコンポーネント
├── widgets/      # ヘッダー・フッターなど複合 UI
├── features/     # 機能単位のコンテナ・UI
├── entities/     # ドメインモデル（MicroCMS 型定義など）
└── shared/       # 汎用 UI・hooks・utils・assets
```

---

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発用の環境変数を設定
cp .env.example .env.local
# VITE_MICROCMS_SERVICE_DOMAIN と VITE_MICROCMS_API_KEY を設定
# さらに Contact フォームを使う場合は
# VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY を設定
# チャットボットを使う場合は GEMINI_API_KEY を設定
```

- `npm run dev` では `.env.local` を参照します。
- ローカルで `npm run build` を実行する場合は `.env.production` を参照します。
- Vercel 上のビルドでは `.env.production` ではなく Vercel の Environment Variables を参照します。
- `VITE_CONTACT_TO_EMAIL` は任意です。EmailJS のテンプレート側で送信先が固定されている場合は空でも動作します。
- `GEMINI_API_KEY` は Vercel の Project Settings > Environment Variables にも必ず設定してください。

---

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルドプレビュー
npm run preview

# テスト実行
npm run test

# テスト（カバレッジ付き）
npm run test:coverage

# Storybook 起動
npm run storybook

# MicroCMS 型定義の自動生成
npm run generate:types

# Lint
npm run lint

# フォーマット
npm run format
```

# MicroCMS 型定義の生成

MicroCMS の API スキーマ（JSON）をエクスポートし、TypeScript 型定義を自動生成します。

### 手順

**1. MicroCMS 管理画面でスキーマをエクスポートする**

1. MicroCMS 管理画面の対象 API を開く
2. 「API 設定」→「API スキーマ」→「エクスポート」をクリック
3. ダウンロードした JSON ファイルを `cms-schemas/` ディレクトリに配置する

ファイル名は `api-{name}.json` の形式にする（例: `api-projects.json`）。

**2. 型定義を生成する**

```bash
npm run generate:types
```

**3. 生成されるファイル**

```
src/entities/microcms/{name}/
├── model/
│   └── types.ts   # MicroCMS フィールドから生成された TypeScript 型
└── index.ts       # 型の re-export
```

例えば `api-projects.json` を配置した場合、`Projects` 型が `src/entities/microcms/projects/` に生成されます。

---

## デプロイ（Vercel）

このプロジェクトは Vercel でデプロイしています。

### ルーティング設定（SPA fallback）

React Router のページを直接リロードしても 404 にならないように、`vercel.json` の `rewrites` で各ページを `index.html` にフォールバックしています。

新しいページを追加した場合は、必ず `vercel.json` にも同じパスを追加してください。

### Vercel Environment Variables

Vercel の Project Settings > Environment Variables に以下を登録してください。

| 変数名                         | 説明                                                       |
| ------------------------------ | ---------------------------------------------------------- |
| `VITE_MICROCMS_SERVICE_DOMAIN` | MicroCMS サービスドメイン                                  |
| `VITE_MICROCMS_API_KEY`        | MicroCMS API キー                                          |
| `VITE_EMAILJS_SERVICE_ID`      | EmailJS の Service ID                                      |
| `VITE_EMAILJS_TEMPLATE_ID`     | EmailJS の Template ID                                     |
| `VITE_EMAILJS_PUBLIC_KEY`      | EmailJS の Public Key                                      |
| `VITE_CONTACT_TO_EMAIL`        | 送信先メールアドレス（任意。テンプレート側で固定なら不要） |
| `GEMINI_API_KEY`               | チャットボット（`/api/chat`）で使用する Gemini API キー    |

`GEMINI_API_KEY` が未設定の場合、チャット API は正しく動作しません。

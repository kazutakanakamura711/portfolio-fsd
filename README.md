# portfolio-fsd

ポートフォリオサイトです。  
React + TypeScript + Vite をベースに、Feature-Sliced Design（FSD）アーキテクチャで構築しています。

🔗 **https://portfolio.sakura-kn.com**

---

## ページ構成

| パス            | 内容                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| `/`             | TOP — ヒーロー・プロフィール概要・アプリ一覧カルーセル・ギャラリー抜粋 |
| `/profile`      | PROFILE — 経歴・スキル詳細                                             |
| `/applications` | APPLICATIONS — 制作したアプリの一覧（MicroCMS から取得）               |
| `/gallery`      | GALLERY — 写真ギャラリー                                               |

---

## 技術スタック

### フロントエンド

- **React 19** / **TypeScript**
- **Vite 7**
- **Tailwind CSS v4** + shadcn/ui + Radix UI
- **React Router v7**
- **Embla Carousel**

### CMS

- **MicroCMS** — アプリケーション一覧の管理

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

**ページを追加した際は `vite.config.ts` の `dynamicRoutes` にもパスを追記してください。**

```ts
sitemap({
  hostname: 'https://portfolio.sakura-kn.com',
  dynamicRoutes: ['/', '/profile', '/applications', '/gallery', '/new-page'],
}),
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

# 環境変数の設定
cp .env.example .env.local
# VITE_MICROCMS_SERVICE_DOMAIN と VITE_MICROCMS_API_KEY を設定
```

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

ファイル名は `api-{name}.json` の形式にする（例: `api-applications.json`）。

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

例えば `api-applications.json` を配置した場合、`Applications` 型が `src/entities/microcms/applications/` に生成されます。

---

## CI/CD

`main` ブランチへ push／merge すると、GitHub Actions が自動でビルド・デプロイを実行します。

### フロー

```
main ブランチへ push
  └─ ① ユニットテスト実行（Vitest）
  └─ ② 本番ビルド（vite build）
  └─ ③ dist/ をロリポップへ FTPS 転送（差分のみ）
```

### 使用ツール

| 用途           | Action                                                                               |
| -------------- | ------------------------------------------------------------------------------------ |
| デプロイ       | [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) v4 |
| 通信プロトコル | FTPS（FTP over TLS）ポート 21                                                        |

### GitHub Secrets の設定

リポジトリの **Settings > Secrets and variables > Actions** に以下を登録してください。

| Secret 名                      | 説明                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| `FTP_SERVER`                   | ロリポップの FTP サーバーホスト（例: `ftp.lolipop.jp`）       |
| `FTP_USERNAME`                 | ロリポップの FTP ユーザー名                                   |
| `FTP_PASSWORD`                 | ロリポップの FTP パスワード                                   |
| `FTP_REMOTE_DIR`               | サーバー上のデプロイ先パス（例: `/portfolio.sakura-kn.com/`） |
| `VITE_MICROCMS_SERVICE_DOMAIN` | MicroCMS サービスドメイン                                     |
| `VITE_MICROCMS_API_KEY`        | MicroCMS API キー                                             |

### 注意

- React Router を使った SPA のため、サーバー側に `.htaccess` を設置して全リクエストを `index.html` へリダイレクトする必要があります（ロリポップは Apache のため `.htaccess` が利用可能）。
- 2 回目以降のデプロイは差分ファイルのみを転送するため高速です。ステートファイル `.ftp-deploy-sync-state.json` はサーバー上に保持されます。

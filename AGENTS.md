# AGENTS.md

このファイルは、このリポジトリで作業するAIエージェントおよび開発支援ツール向けの指示です。人間向けの詳細な運用ルールは [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) を参照してください。

## 作業前

- `git status -sb` と `git branch --show-current` で作業ツリーとブランチを確認する。
- 作業開始時は最新の `develop` から作業ブランチを作成する。
- 既存のユーザー変更を上書き・削除せず、依頼範囲外の差分を混ぜない。
- ファイル編集には `apply_patch` を使用する。

```bash
git switch develop
git pull --ff-only origin develop
git switch -c <prefix>/<description>
```

## 実装後の確認

変更内容に応じて、次のコマンドを実行する。

```bash
npm run test:unit
npm run build
npm run lint
git diff --check
```

実行できない確認項目がある場合は、理由をPR本文に記載する。

## GitとPR

- `main` と `develop` へ直接コミット・プッシュしない。
- ブランチ名は `<type>/<short-description>` の形式にし、小文字の英語とハイフン区切りを使う。
- ブランチの `type` は `feat`、`fix`、`chore`、`refactor`、`docs`、`test`、`style` を使用する。緊急の本番修正のみ `hotfix` を使用できる。
- ブランチ名には日本語、空白、アンダースコア、`from-main` のような作業経緯を含めない。
- コミットメッセージは `feat:`、`fix:`、`chore:`、`refactor:`、`docs:`、`test:`、`style:` のいずれかで始める。
- 作業ブランチをプッシュし、日本語で `develop` 向けPRを作成する。
- PR作成時は作成者本人をアサインする。
- ユーザーの確認なしにPRをマージしない。
- マージ前に差分、CI、PRのベースブランチが正しいことを確認する。

## MicroCMSとアプリ実装

- MicroCMSスキーマは `cms-schemas/` と実装側の型・取得処理を合わせて確認する。
- `projects` APIの `type`（`application`、`work`、`wordpress`、`lp`）を取り違えない。
- APIフィールド、環境変数、公開データなどをログへ出力しない。
- スキーマやコンテンツAPIの削除・変更は、参照箇所と公開状態を確認してから行う。
- ルーティングやナビゲーションを変更した場合は、TOPと下層ページの両方を確認する。

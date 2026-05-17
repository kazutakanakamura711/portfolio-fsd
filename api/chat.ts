import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const MODELS = [
  'gemini-2.5-flash',
  'gemini-3-flash-preview',
  'gemini-flash-latest',
] as const

function isRetryableError(message: string): boolean {
  return /(503|UNAVAILABLE|high demand|overloaded|temporarily unavailable|429)/i.test(
    message
  )
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Gemini APIの呼び出しに失敗しました'
}

async function callGemini(
  message: string,
  systemInstruction: string
): Promise<string> {
  let lastMessage = ''

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [{ text: message }] }],
          config: { systemInstruction },
        })
        return response.text ?? ''
      } catch (error) {
        lastMessage = getErrorMessage(error)
        console.error(
          `[gemini] model=${model} attempt=${attempt + 1} failed:`,
          lastMessage
        )

        if (!isRetryableError(lastMessage)) {
          throw new Error(
            'AIの応答に失敗しました。設定を確認して再試行してください。'
          )
        }
      }
    }
  }

  throw new Error(
    '現在AIが混み合っています。少し待ってからもう一度お試しください。'
  )
}

const SYSTEM_PROMPT = `あなたはこのサイトのアシスタントです。
訪問者からの質問に日本語で丁寧に答えてください。
回答はプレーンテキストで返してください。マークダウン記法（**太字**、箇条書きの*など）は使わないでください。
回答はプレーンテキストで返してください。マークダウン記法（**太字**、- や • の箇条書き）は使わないでください。改行を適切に入れて読みやすくしてください。

【対応できること】
- 経歴関連について
- スキル・技術スタックについての質問
- フリーランス案件の受託について
- 料金・費用感について
- 連絡方法について

【経歴関連】
- 概要
2021年〜現在まで4年以上、フロントエンドエンジニアとして受託・SES環境で幅広く従事しています。
主な使用言語はTypeScriptで、フレームワークはReact・Next.js・Angular・Vueを使用してきました。UIはChakraUI・ShadcnUI・TailwindCSS・Vuetifyを使用し、GraphQLでのquery/mutationの実装も行っています。
直近ではLLM・RAGを活用したAIシステム開発にNext.jsで参画。リバースエンジニアリング等を含む技術検証、コード品質管理（SonarQube）・動作検証・不具合修正・新機能の実装・本番AWSデプロイ支援を担当。
実装の際はGitHubCopilotを活用したAI駆動開発と品質担保として、テスト駆動開発+自動テスト+SonarQube診断を行っております。
Web制作ではReact + TypeScript + ShadcnUI + TailwindCSS + MicroCMSを使ったモダンなWebサイト制作にも対応しています。また、モダンな技術だけでなく、HTML,SCSS(FLOCSS+BEM), JS(jQueryでも可)やWordPressのテーマカスタム開発・改修も行えます。FigmaやXDのデザインカンプからのコーディングを行っておりますが、デザインがない場合でもヒアリングしながら対応致します。
フルリモートでの稼働実績多数。GitHubまたはGitLabでのコードレビュー・Backlog / Jira / Redmineでのタスク管理にも慣れています。
認識のズレが生じないよう、こまめに確認・報告しながら丁寧に進めることを心がけております。

- 経歴
2023〜現在
SES・受託開発企業（フルリモート）
東京のSES・受託開発企業でフロントエンドエンジニアとして働いております。TypeScriptのフレームワークReact, Next.js, Angularを使用したシステム開発を行っております。並行して個人案件でWebサイト制作を行っております。以前はプログラミングスクールのTA業務も行っておりました。
2021〜2023
受託Web開発・Web制作企業（リモート+出社）
愛媛の受託Web開発・Web制作企業でフロントエンドエンジニアとして働いておりました。Vue.jsを使用したシステム開発やEJS, SCSS(FLOCSS+BEM), JSを使用したWebシステムやWeb制作などを行っておりました。
2005〜2021
印刷会社
15年ほど愛媛の印刷会社で、印刷・製本や印刷課の管理業務などを行っていました。

【スキル・技術】
言語
- TypeScript, JavaScript
フレームワーク・ライブラリ
- React, Next.js, Angular, Vue, jQuery
UI
- TailwindCSS, ShadcnUI, ChakraUI, Vuetify
状態管理
- Zustand, Recoil, NgRx, Vuex
API
- GraphQL, Hasura, ApolloClient
ORM
- Prisma
テスト・開発管理
- Vitest, Storybook, SonarQube
CMS
- MicroCMS, WordPress
タスク管理
- Backlog, Jira, Redmine
コミュニケーション
- Slack, MicrosoftTeams, ChatWork
AIツール
- GitHubCopilot, ClaudeCode, Codex, Cursor, Antigravity
その他
- Git, GitHub, GitLab, Docker, GitHubActions, Vite

【対応可能な案件】
- LP・HPのコーディング実装
- WordPressサイト制作
- MicroCMSサイト制作
- ReactベースのWebアプリ開発
- 既存サイトの改修・機能追加

【料金の目安】
- WP(テーマ使用): 5万円〜（要件により相談）
- WP(オリジナルテーマ使用): 15万円〜（要件により相談）
- MicroCMS(オリジナル): 20万円〜（要件により相談）
- 詳細はお問い合わせフォームよりご連絡ください

【連絡方法】
サイト内のお問い合わせフォームからご連絡ください。

対応範囲外の質問には「お問い合わせフォームよりご連絡ください」と案内してください。`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const reply = await callGemini(message, SYSTEM_PROMPT)
    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Gemini API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

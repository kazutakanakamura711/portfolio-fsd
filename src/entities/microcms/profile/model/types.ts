/**
 * このファイルは自動生成されています。
 * 直接編集せず、npm run generate:types を実行して再生成してください。
 *
 * 生成元: cms-schemas/object-type/api-profile.json
 */

import type { MicroCMSImage, MicroCMSObjectContent } from 'microcms-js-sdk'

export type Profile = MicroCMSObjectContent & {
  name: string
  image: MicroCMSImage
  about: string
  programming_lang: string
  framework: string
  ui_library: string
  state_library: string
  api: string
  orm: string
  test_tool: string
  cms: string
  task_management: string
  communication: string
  ai_tool: string
  other: string
}

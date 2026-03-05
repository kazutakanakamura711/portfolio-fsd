/**
 * このファイルは自動生成されています。
 * 直接編集せず、npm run generate:types を実行して再生成してください。
 *
 * 生成元: cms-schemas/api-applications.json
 */

import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Applications = MicroCMSListContent & {
  title: string
  description: string
  thumbnail: MicroCMSImage
  url: string
  github_url: string
  technologies: string
}

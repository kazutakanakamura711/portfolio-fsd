/**
 * このファイルは自動生成されています。
 * 直接編集せず、npm run generate:types を実行して再生成してください。
 *
 * 生成元: cms-schemas/list-type/api-works.json
 */

import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Works = MicroCMSListContent & {
  title: string
  thumbnail: MicroCMSImage
  description: string
  technologies: string
  url: string
}

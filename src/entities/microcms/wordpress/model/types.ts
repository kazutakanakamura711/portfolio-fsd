/**
 * このファイルは自動生成されています。
 * 直接編集せず、npm run generate:types を実行して再生成してください。
 *
 * 生成元: cms-schemas/api-wordpress.json
 */

import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Wordpress = MicroCMSListContent & {
  title: string
  thumbnail: MicroCMSImage
  description: string
  technologies: string
  url: string
}

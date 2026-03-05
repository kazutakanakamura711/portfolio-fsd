/**
 * MicroCMS スキーマから TypeScript 型定義を自動生成するスクリプト
 *
 * 使い方:
 *   npm run generate:types
 *
 * cms-schemas/ 配下の api-*.json を読み込み、
 * src/entities/microcms/{name}/model/types.ts と
 * src/entities/microcms/{name}/index.ts を生成します。
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const SCHEMAS_DIR = path.join(ROOT_DIR, 'cms-schemas')
const ENTITIES_DIR = path.join(ROOT_DIR, 'src', 'entities', 'microcms')

// MicroCMS のフィールド種別 → TypeScript 型のマッピング
const KIND_TO_TS_TYPE: Record<string, string> = {
  text: 'string',
  textArea: 'string',
  richEditor: 'string',
  number: 'number',
  boolean: 'boolean',
  media: 'MicroCMSImage',
  date: 'string',
  select: 'string',
  relation: 'MicroCMSContentId',
  relationList: 'MicroCMSContentId[]',
  repeater: 'unknown[]',
  custom: 'unknown',
}

interface ApiField {
  fieldId: string
  name: string
  kind: string
  required: boolean
}

interface ApiSchema {
  apiFields: ApiField[]
  customFields: unknown[]
}

// Pascal ケースに変換（例: applications → Applications）
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

// types.ts の内容を生成
function generateTypesContent(name: string, schema: ApiSchema): string {
  const typeName = toPascalCase(name)
  const fields = schema.apiFields

  const fieldLines = fields
    .map((field) => {
      const tsType = KIND_TO_TS_TYPE[field.kind] ?? 'unknown'
      const optional = field.required ? '' : '?'
      return `  ${field.fieldId}${optional}: ${tsType}`
    })
    .join('\n')

  return `/**
 * このファイルは自動生成されています。
 * 直接編集せず、npm run generate:types を実行して再生成してください。
 *
 * 生成元: cms-schemas/api-${name}.json
 */

import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type ${typeName} = MicroCMSListContent & {
${fieldLines}
}
`
}

// index.ts の内容を生成
function generateIndexContent(name: string): string {
  const typeName = toPascalCase(name)
  return `export type { ${typeName} } from './model/types'
`
}

// ディレクトリを再帰的に作成
function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// メイン処理
function main(): void {
  if (!fs.existsSync(SCHEMAS_DIR)) {
    console.error(
      `❌ cms-schemas/ ディレクトリが見つかりません: ${SCHEMAS_DIR}`
    )
    process.exit(1)
  }

  const schemaFiles = fs
    .readdirSync(SCHEMAS_DIR)
    .filter((f) => f.startsWith('api-') && f.endsWith('.json'))

  if (schemaFiles.length === 0) {
    console.warn('⚠️  cms-schemas/ に api-*.json ファイルが見つかりません')
    process.exit(0)
  }

  for (const file of schemaFiles) {
    // api-applications.json → applications
    const name = file.replace(/^api-/, '').replace(/\.json$/, '')
    const schemaPath = path.join(SCHEMAS_DIR, file)

    let schema: ApiSchema
    try {
      schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8')) as ApiSchema
    } catch {
      console.error(`❌ JSON の読み込みに失敗しました: ${file}`)
      continue
    }

    const entityDir = path.join(ENTITIES_DIR, name)
    const modelDir = path.join(entityDir, 'model')

    ensureDir(modelDir)

    // types.ts を生成
    const typesPath = path.join(modelDir, 'types.ts')
    fs.writeFileSync(typesPath, generateTypesContent(name, schema), 'utf-8')
    console.log(`✅ 生成: src/entities/microcms/${name}/model/types.ts`)

    // index.ts を生成
    const indexPath = path.join(entityDir, 'index.ts')
    fs.writeFileSync(indexPath, generateIndexContent(name), 'utf-8')
    console.log(`✅ 生成: src/entities/microcms/${name}/index.ts`)
  }

  console.log('\n🎉 型定義の生成が完了しました！')
}

main()

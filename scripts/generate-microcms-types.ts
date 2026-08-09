/**
 * MicroCMS スキーマから TypeScript 型定義を自動生成するスクリプト
 *
 * 使い方:
 *   npm run generate:types
 *
 * cms-schemas/object-type/ 配下の api-*.json → MicroCMSObjectContent ベースの型
 * cms-schemas/list-type/   配下の api-*.json → MicroCMSListContent  ベースの型
 * を src/entities/microcms/{name}/model/types.ts に生成します。
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
  richEditorV2: 'string',
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
  customFieldIds?: string[]
}

interface CustomField {
  fieldId: string
  name: string
  fields: ApiField[]
}

interface ApiSchema {
  apiFields: ApiField[]
  customFields: CustomField[]
}

// Pascal ケースに変換（例: applications → Applications）
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

// types.ts の内容を生成
function generateTypesContent(
  name: string,
  schema: ApiSchema,
  isObject: boolean
): string {
  const typeName = toPascalCase(name)
  const fields = schema.apiFields
  const customFieldsById = new Map(
    schema.customFields.map((customField) => [customField.fieldId, customField])
  )

  const customFieldTypeName = (customField: CustomField) =>
    `${typeName}${toPascalCase(customField.fieldId)}`

  const fieldType = (field: ApiField) => {
    if (field.kind !== 'repeater') {
      return KIND_TO_TS_TYPE[field.kind] ?? 'unknown'
    }

    const repeaterTypes = (field.customFieldIds ?? [])
      .map((customFieldId) => customFieldsById.get(customFieldId))
      .filter((customField): customField is CustomField => Boolean(customField))
      .map(customFieldTypeName)

    return repeaterTypes.length > 0
      ? `(${repeaterTypes.join(' | ')})[]`
      : 'unknown[]'
  }

  const fieldLines = fields
    .map((field) => {
      const tsType = fieldType(field)
      const optional = field.required ? '' : '?'
      return `  ${field.fieldId}${optional}: ${tsType}`
    })
    .join('\n')

  const repeatedCustomFields = schema.apiFields
    .filter((field) => field.kind === 'repeater')
    .flatMap((field) => field.customFieldIds ?? [])
    .map((customFieldId) => customFieldsById.get(customFieldId))
    .filter((customField): customField is CustomField => Boolean(customField))
    .filter(
      (customField, index, customFields) =>
        customFields.findIndex(
          ({ fieldId }) => fieldId === customField.fieldId
        ) === index
    )

  const customFieldTypes = repeatedCustomFields
    .map((customField) => {
      const customFieldLines = customField.fields
        .map((field) => {
          const tsType = KIND_TO_TS_TYPE[field.kind] ?? 'unknown'
          const optional = field.required ? '' : '?'
          return `  ${field.fieldId}${optional}: ${tsType}`
        })
        .join('\n')

      return `export type ${customFieldTypeName(customField)} = {\n  fieldId: '${customField.fieldId}'\n${customFieldLines}\n}`
    })
    .join('\n\n')

  const baseType = isObject ? 'MicroCMSObjectContent' : 'MicroCMSListContent'
  const allFieldTypes = [
    ...fields.map(fieldType),
    ...repeatedCustomFields.flatMap((customField) =>
      customField.fields.map(
        (field) => KIND_TO_TS_TYPE[field.kind] ?? 'unknown'
      )
    ),
  ]
  const importTypes = [
    ...(allFieldTypes.includes('MicroCMSImage') ? ['MicroCMSImage'] : []),
    ...(allFieldTypes.includes('MicroCMSContentId') ||
    allFieldTypes.includes('MicroCMSContentId[]')
      ? ['MicroCMSContentId']
      : []),
    isObject ? 'MicroCMSObjectContent' : 'MicroCMSListContent',
  ].join(', ')
  const subDir = isObject ? 'object-type' : 'list-type'

  return `/**
 * このファイルは自動生成されています。
 * 直接編集せず、npm run generate:types を実行して再生成してください。
 *
 * 生成元: cms-schemas/${subDir}/api-${name}.json
 */

import type { ${importTypes} } from 'microcms-js-sdk'

export type ${typeName} = ${baseType} & {
${fieldLines}
}${customFieldTypes ? `\n\n${customFieldTypes}` : ''}
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

type ApiTypeDir = { dir: string; isObject: boolean }

// メイン処理
function main(): void {
  if (!fs.existsSync(SCHEMAS_DIR)) {
    console.error(
      `❌ cms-schemas/ ディレクトリが見つかりません: ${SCHEMAS_DIR}`
    )
    process.exit(1)
  }

  const apiTypeDirs: ApiTypeDir[] = [
    { dir: path.join(SCHEMAS_DIR, 'object-type'), isObject: true },
    { dir: path.join(SCHEMAS_DIR, 'list-type'), isObject: false },
  ]

  let totalGenerated = 0

  for (const { dir, isObject } of apiTypeDirs) {
    if (!fs.existsSync(dir)) continue

    const schemaFiles = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('api-') && f.endsWith('.json'))

    for (const file of schemaFiles) {
      const name = file.replace(/^api-/, '').replace(/\.json$/, '')
      const schemaPath = path.join(dir, file)

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
      fs.writeFileSync(
        typesPath,
        generateTypesContent(name, schema, isObject),
        'utf-8'
      )
      console.log(`✅ 生成: src/entities/microcms/${name}/model/types.ts`)

      // index.ts を生成
      const indexPath = path.join(entityDir, 'index.ts')
      fs.writeFileSync(indexPath, generateIndexContent(name), 'utf-8')
      console.log(`✅ 生成: src/entities/microcms/${name}/index.ts`)

      totalGenerated++
    }
  }

  if (totalGenerated === 0) {
    console.warn(
      '⚠️  cms-schemas/object-type/ または cms-schemas/list-type/ に api-*.json ファイルが見つかりません'
    )
    process.exit(0)
  }

  console.log('\n🎉 型定義の生成が完了しました！')
}

main()

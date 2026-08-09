import type { Profile } from '@/entities/microcms/profile'

type SkillsData = Omit<
  Profile,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
  | 'revisedAt'
  | 'name'
  | 'image'
  | 'about'
  | 'careers'
>

const SKILL_LABELS: Record<keyof SkillsData, string> = {
  programming_lang: '言語',
  framework: 'フレームワーク・ライブラリ',
  ui_library: 'UI',
  state_library: '状態管理',
  api: 'API',
  orm: 'ORM',
  test_tool: 'テスト・開発管理',
  cms: 'CMS',
  task_management: 'タスク管理',
  communication: 'コミュニケーション',
  ai_tool: 'AIツール',
  other: 'その他',
}

const splitSkillValues = (value: string): string[] => {
  return value
    .split(/[、,/|]+/)
    .map((v) => v.trim())
    .filter(Boolean)
}

type Props = SkillsData

export const ProfileSkills = (props: Props) => {
  const skills = (Object.keys(SKILL_LABELS) as (keyof SkillsData)[]).map(
    (key) => ({
      label: SKILL_LABELS[key],
      value: props[key],
    })
  )

  return (
    <div className="flex flex-col gap-4 border-t border-white/20 pt-8">
      <h2 className="font-medium tracking-wider">スキルセット</h2>
      <ul className="flex flex-col gap-3">
        {skills.map((skill) => (
          <li key={skill.label} className="flex flex-col gap-2">
            <span className="text-sm">{skill.label}</span>
            <div className="flex flex-wrap gap-2">
              {splitSkillValues(skill.value).map((tag) => (
                <span
                  key={`${skill.label}-${tag}`}
                  className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

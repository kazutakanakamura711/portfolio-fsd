const SKILLS = [
  { label: '言語', value: 'TypeScript / JavaScript' },
  {
    label: 'フレームワーク・ライブラリ',
    value: 'React / Next.js / Angular / Vue / Jquery',
  },
  { label: 'UI', value: 'TailwindCSS / ShadcnUI / ChakraUI / Vuetify' },
  { label: 'API', value: 'GraphQL' },
  { label: 'ORM', value: 'Prisma' },
  { label: 'CMS', value: 'MicroCMS' },
  { label: 'タスク管理', value: 'Backlog / Jira' },
  {
    label: 'コミュニケーション',
    value: 'Slack / MicrosoftTeams / ChatWork',
  },
  {
    label: 'AIツール',
    value: 'GitHubCopilot / Antigravity / Cursor / Claude / Gemini / ChatGPT ',
  },
  {
    label: 'その他',
    value:
      'Git / GitHub / GitLab / Storybook / Vitest / Docker / Vite / Hasura / ApolloClient',
  },
]

export const ProfileSkills = () => {
  return (
    <div className="flex flex-col gap-4 border-t pt-8">
      <h2 className="font-medium tracking-wider">スキルセット</h2>
      <ul className="flex flex-col gap-2">
        {SKILLS.map((skill) => (
          <li key={skill.label} className="text-sm">
            {skill.label}: {skill.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

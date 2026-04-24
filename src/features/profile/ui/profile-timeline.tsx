import type { Careers } from '@/entities/microcms/careers'

type Props = {
  careers: Careers[]
}

export const ProfileTimeline = ({ careers }: Props) => {
  return (
    <div className="flex flex-col gap-4 border-t border-white/20 pt-8">
      <h2 className="font-medium tracking-wider">経歴</h2>
      <ol className="relative ml-3">
        {careers.map((item) => (
          <li key={item.id} className="mb-8 ml-6 last:mb-0">
            <span className="absolute -left-2.25 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white" />
            <p className="mb-1 text-xs text-white/50">{item.period}</p>
            <h3 className="mb-1 text-sm font-bold leading-snug text-white">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-white">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

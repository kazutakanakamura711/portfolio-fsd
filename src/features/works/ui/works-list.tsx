import { useState } from 'react'

import type { Works } from '@/entities/microcms/works'
import { Skeleton } from '@/shared/ui'

type Props = {
  works: Works[]
}

const splitTechnologies = (technologies: string): string[] => {
  return technologies
    .split(/[、,/|]+/)
    .map((tech) => tech.trim())
    .filter(Boolean)
}

const WorkItem = ({ work, index }: { work: Works; index: number }) => {
  const isEven = index % 2 === 0
  const [isLoaded, setIsLoaded] = useState(false)
  const techTags = splitTechnologies(work.technologies)

  return (
    <article className="flex flex-col gap-8 items-start border-t border-white/20 pt-8">
      <div className="relative w-full overflow-hidden rounded-xl">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        )}
        <img
          src={`${work.thumbnail.url}?w=800&q=75&fm=webp`}
          alt={work.title}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>

      <div className="w-full flex flex-col gap-4 bg-white/10 p-6 rounded-xl">
        <h2 className="text-xl font-medium tracking-wider">{work.title}</h2>
        <p className="text-sm leading-relaxed">{work.description}</p>

        <div className="flex flex-wrap gap-2">
          {techTags.map((tag) => (
            <span
              key={`${work.id}-${tag}`}
              className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-6 text-sm">
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-wider hover:opacity-60 transition-opacity"
          >
            Site →
          </a>
        </div>
      </div>
    </article>
  )
}

export const WorksList = ({ works }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      {works.map((work, index) => (
        <WorkItem key={work.id} work={work} index={index} />
      ))}
    </div>
  )
}

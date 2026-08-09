import { useState } from 'react'

import type { Projects } from '@/entities/microcms/projects'
import { Skeleton } from '@/shared/ui'

type Props = {
  landingPages: Projects[]
}

const LpItem = ({ landingPage }: { landingPage: Projects }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <article className="flex flex-col gap-8 items-start border-t border-white/20 pt-8">
      <div className="relative w-full overflow-hidden rounded-xl">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        )}
        <img
          src={`${landingPage.thumbnail.url}?w=800&q=75&fm=webp`}
          alt={landingPage.title}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>

      <div className="w-full flex flex-col gap-4 bg-white/10 p-6 rounded-xl">
        <h2 className="text-xl font-medium tracking-wider">
          {landingPage.title}
        </h2>
        <p className="text-sm leading-relaxed">{landingPage.description}</p>
        <p className="text-xs">{landingPage.technologies}</p>
        <a
          href={landingPage.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-wider hover:opacity-60 transition-opacity"
        >
          Site →
        </a>
      </div>
    </article>
  )
}

export const LpList = ({ landingPages }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      {landingPages.map((landingPage) => (
        <LpItem key={landingPage.id} landingPage={landingPage} />
      ))}
    </div>
  )
}

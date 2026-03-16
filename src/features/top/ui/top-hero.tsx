import { useState } from 'react'

import heroImage from '@/shared/assets/top/img-top-hero.webp'
import { Skeleton } from '@/shared/ui'

export const TopHero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        {!isLoaded && <Skeleton className="w-full aspect-video rounded-none" />}
        <img
          src={heroImage}
          alt="hero"
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 h-full'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
    </section>
  )
}

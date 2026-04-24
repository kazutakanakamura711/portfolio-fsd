import { useState } from 'react'
import type { MicroCMSImage } from 'microcms-js-sdk'
import { Skeleton } from '@/shared/ui'

type Props = {
  image: MicroCMSImage
  name: string
}

export const ProfileHero = ({ image, name }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-xl">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        )}
        <img
          src={`${image.url}?w=600&q=75&fm=webp`}
          alt={name}
          className={`w-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium tracking-widest">{name.toUpperCase()}</p>
        <p className="text-sm text-muted-foreground tracking-wider">
          フロントエンドエンジニア
        </p>
      </div>
    </div>
  )
}

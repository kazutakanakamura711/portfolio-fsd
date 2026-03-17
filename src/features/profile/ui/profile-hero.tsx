import { useState } from 'react'
import profileImage from '@/shared/assets/img-profile.webp'
import { Skeleton } from '@/shared/ui'

export const ProfileHero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-sm">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        )}
        <img
          src={profileImage}
          alt="Kazutaka Nakamura"
          className={`w-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium tracking-widest">KAZUTAKA NAKAMURA</p>
        <p className="text-sm text-muted-foreground tracking-wider">
          フロントエンドエンジニア
        </p>
      </div>
    </div>
  )
}

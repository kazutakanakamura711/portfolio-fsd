import { useState } from 'react'

import profileImage from '@/shared/assets/img-profile.webp'
import { Skeleton } from '@/shared/ui'
import { Title } from '@/shared/ui'

export const TopProfile = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section className="flex flex-col items-center gap-8">
      <Title>PROFILE</Title>
      <div className="relative w-40 h-40 overflow-hidden">
        {!isLoaded && <Skeleton className="w-40 h-40 rounded-none" />}
        <img
          src={profileImage}
          alt="Kazutaka Nakamura"
          className={`w-40 h-40 object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-medium tracking-widest">KAZUTAKA NAKAMURA</p>
        <p className="text-muted-foreground tracking-wider">
          フロントエンドエンジニア
        </p>
      </div>
    </section>
  )
}

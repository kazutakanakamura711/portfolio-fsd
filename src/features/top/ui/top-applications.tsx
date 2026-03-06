import { useState } from 'react'

import type { Applications } from '@/entities/microcms/applications'
import applicationsImage from '@/shared/assets/top/img-top-applications.png'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { TopCarousel } from './top-carousel'

type Props = {
  applications: Applications[]
  isLoading: boolean
}

export const TopApplications = ({ applications, isLoading }: Props) => {
  const [isIntroImageLoaded, setIsIntroImageLoaded] = useState(false)

  if (isLoading) {
    return (
      <section className="flex flex-col gap-8">
        <h2 className="text-4xl font-medium tracking-super-wide text-center">
          APPLICATIONS
        </h2>
        <p className="text-center text-sm">Loading...</p>
      </section>
    )
  }

  if (applications.length === 0) {
    return (
      <section className="flex flex-col gap-8">
        <h2 className="text-4xl font-medium tracking-super-wide text-center">
          APPLICATIONS
        </h2>
        <p className="text-center text-sm">No applications found.</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-16">
      <h2 className="text-2xl font-medium tracking-super-wide text-center">
        APPLICATIONS
      </h2>

      {/* テキスト＋画像 */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <p className="w-full md:w-1/2 text-sm leading-relaxed">
          実案件以外のアプリケーションです。ゲームやコピペコンポーネントなどを含みます。
        </p>
        <div className="relative w-full md:w-1/2 overflow-hidden">
          {!isIntroImageLoaded && (
            <Skeleton className="w-full aspect-3/2 rounded-none" />
          )}
          <img
            src={applicationsImage}
            alt="applications"
            className={`w-full h-auto object-cover transition-opacity duration-300 ${
              isIntroImageLoaded
                ? 'opacity-100'
                : 'opacity-0 absolute inset-0 h-full'
            }`}
            onLoad={() => setIsIntroImageLoaded(true)}
            onError={() => setIsIntroImageLoaded(true)}
          />
        </div>
      </div>
      {/* カルーセル */}
      <TopCarousel applications={applications} />
    </section>
  )
}

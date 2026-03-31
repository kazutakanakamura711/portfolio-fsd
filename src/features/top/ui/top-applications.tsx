import { useState } from 'react'
import { motion } from 'framer-motion'

import type { Applications } from '@/entities/microcms/applications'
import applicationsImage from '@/shared/assets/top/img-top-applications.webp'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Skeleton } from '@/shared/ui'
import { TopCarousel } from './top-carousel'
import { Title } from '@/shared/ui'

type Props = {
  applications: Applications[]
  isLoading: boolean
}

export const TopApplications = ({ applications, isLoading }: Props) => {
  const [isIntroImageLoaded, setIsIntroImageLoaded] = useState(false)

  if (isLoading) {
    return (
      <section className="flex flex-col gap-8">
        <Title>APPLICATIONS</Title>
        <p className="text-center text-sm">Loading...</p>
      </section>
    )
  }

  if (applications.length === 0) {
    return (
      <section className="flex flex-col gap-8">
        <Title>APPLICATIONS</Title>
        <p className="text-center text-sm">No applications found.</p>
      </section>
    )
  }

  return (
    <motion.section
      className="flex flex-col gap-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeInDown} className="self-center">
        <Title>APPLICATIONS</Title>
      </motion.div>

      {/* テキスト＋画像 */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-8 items-center"
      >
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
        <p className="w-full md:w-1/2 text-sm leading-relaxed">
          実案件以外のアプリケーションです。ゲームやコピペコンポーネントなどを含みます。
        </p>
      </motion.div>
      {/* カルーセル */}
      <motion.div variants={fadeInUp} className="max-w-3xl mx-auto w-full">
        <TopCarousel applications={applications} />
      </motion.div>
    </motion.section>
  )
}

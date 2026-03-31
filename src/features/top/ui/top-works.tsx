import { useState } from 'react'
import { motion } from 'framer-motion'

import type { Works } from '@/entities/microcms/works'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Skeleton, Title } from '@/shared/ui'
import worksImage from '@/shared/assets/top/img-top-works.webp'
import { TopWorksCarousel } from './top-works-carousel'

type Props = {
  works: Works[]
  isLoading: boolean
}

export const TopWorks = ({ works, isLoading }: Props) => {
  const [isIntroImageLoaded, setIsIntroImageLoaded] = useState(false)
  const featuredWork = works[0]

  if (isLoading) {
    return (
      <section className="flex flex-col gap-8">
        <Title>WORKS</Title>
        <p className="text-center text-sm">Loading...</p>
      </section>
    )
  }

  if (works.length === 0 || !featuredWork) {
    return (
      <section className="flex flex-col gap-8">
        <Title>WORKS</Title>
        <p className="text-center text-sm">No works found.</p>
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
        <Title>WORKS</Title>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="relative w-full md:w-1/2 overflow-hidden">
          {!isIntroImageLoaded && (
            <Skeleton className="w-full aspect-3/2 rounded-none" />
          )}
          <img
            src={worksImage}
            alt={featuredWork.title}
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
          実案件として制作したWebサイトやLPの実績です。企画意図や導線設計を踏まえつつ、
          デザインを忠実に再現し、運用しやすいフロントエンドとして構築しています。
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="max-w-3xl mx-auto w-full">
        <TopWorksCarousel works={works} />
      </motion.div>
    </motion.section>
  )
}

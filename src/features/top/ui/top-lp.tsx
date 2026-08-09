import { useState } from 'react'
import { motion } from 'framer-motion'

import type { Projects } from '@/entities/microcms/projects'
import landingPagesImage from '@/shared/assets/top/img-top-lp.png'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Skeleton, Title } from '@/shared/ui'
import { TopWorksCarousel } from './top-works-carousel'

type Props = {
  landingPages: Projects[]
  isLoading: boolean
}

export const TopLp = ({ landingPages, isLoading }: Props) => {
  const [isIntroImageLoaded, setIsIntroImageLoaded] = useState(false)
  const featuredLandingPage = landingPages[0]

  if (isLoading) {
    return (
      <section className="flex flex-col gap-8">
        <Title>LANDING PAGES</Title>
        <p className="text-center text-sm">Loading...</p>
      </section>
    )
  }

  if (landingPages.length === 0 || !featuredLandingPage) {
    return (
      <section className="flex flex-col gap-8">
        <Title>LANDING PAGES</Title>
        <p className="text-center text-sm">No landing pages found.</p>
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
        <Title>LANDING PAGES</Title>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-8 items-center"
      >
        <div className="relative w-full overflow-hidden rounded-xl">
          {!isIntroImageLoaded && (
            <Skeleton className="w-full aspect-3/2 rounded-none" />
          )}
          <img
            src={landingPagesImage}
            alt={featuredLandingPage.title}
            className={`w-full h-auto object-cover transition-opacity duration-300 ${
              isIntroImageLoaded
                ? 'opacity-100'
                : 'opacity-0 absolute inset-0 h-full'
            }`}
            onLoad={() => setIsIntroImageLoaded(true)}
            onError={() => setIsIntroImageLoaded(true)}
          />
        </div>
        <p className="w-full text-sm leading-relaxed">
          コンセプトやブランドの魅力を、情報設計とビジュアルで伝えるランディングページです。
          目的に合わせた世界観と導線を設計し、印象に残る体験を制作しています。
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full">
        <TopWorksCarousel works={landingPages} />
      </motion.div>
    </motion.section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'

import type { Wordpress } from '@/entities/microcms/wordpress'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Skeleton, Title } from '@/shared/ui'
import wordpressImage from '@/shared/assets/top/img-top-wordpress.webp'
import { TopWordpressCarousel } from './top-wordpress-carousel'

type Props = {
  wordpresses: Wordpress[]
  isLoading: boolean
}

export const TopWordpress = ({ wordpresses, isLoading }: Props) => {
  const [isIntroImageLoaded, setIsIntroImageLoaded] = useState(false)
  const featuredWordpress = wordpresses[0]

  if (isLoading) {
    return (
      <section className="flex flex-col gap-8">
        <Title>WORDPRESS</Title>
        <p className="text-center text-sm">Loading...</p>
      </section>
    )
  }

  if (wordpresses.length === 0 || !featuredWordpress) {
    return (
      <section className="flex flex-col gap-8">
        <Title>WORDPRESS</Title>
        <p className="text-center text-sm">No items found.</p>
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
        <Title>WORDPRESS</Title>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-8 items-center"
      >
        <p className="w-full text-sm leading-relaxed">
          WordPressを使用した制作実績です。デザインカンプをもとに実装し、
          運用しやすいWordPressテーマとして構築しています。
        </p>
        <div className="relative w-full overflow-hidden rounded-xl">
          {!isIntroImageLoaded && (
            <Skeleton className="w-full aspect-3/2 rounded-none" />
          )}
          <img
            src={wordpressImage}
            alt="wordpress"
            className={`w-full h-auto object-cover transition-opacity duration-300 ${
              isIntroImageLoaded
                ? 'opacity-100'
                : 'opacity-0 absolute inset-0 h-full'
            }`}
            onLoad={() => setIsIntroImageLoaded(true)}
            onError={() => setIsIntroImageLoaded(true)}
          />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full">
        <TopWordpressCarousel wordpresses={wordpresses} />
      </motion.div>
    </motion.section>
  )
}

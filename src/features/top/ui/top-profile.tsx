import { useState } from 'react'
import { motion } from 'framer-motion'

import profileImage from '@/shared/assets/img-profile.webp'
import { Skeleton } from '@/shared/ui'
import { Title } from '@/shared/ui'
import { fadeInUp, staggerContainer } from '@/shared/lib/animations'

export const TopProfile = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className="flex flex-col items-center gap-8"
    >
      {/* タイトル */}
      <motion.div variants={fadeInUp}>
        <Title>PROFILE</Title>
      </motion.div>

      {/* プロフィール画像 */}
      <motion.div
        variants={fadeInUp}
        className="relative w-40 h-40 overflow-hidden"
      >
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
      </motion.div>

      {/* 名前・肩書き */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col items-center gap-1 text-center"
      >
        <p className="font-bold tracking-widest">KAZUTAKA NAKAMURA</p>
        <p className="text-sm text-muted-foreground">
          フロントエンドエンジニア
        </p>
      </motion.div>
    </motion.section>
  )
}

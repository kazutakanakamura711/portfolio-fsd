import { useState } from 'react'
import { motion } from 'framer-motion'

import galleryImage from '@/shared/assets/top/img-top-gallery.webp'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Skeleton } from '@/shared/ui'

export const TopGallery = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <motion.section
      className="flex flex-col gap-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={fadeInDown}
        className="text-2xl font-medium tracking-super-wide text-center"
      >
        GALLERY
      </motion.h2>

      {/* 画像＋テキスト（左に画像・右にテキスト） */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="relative w-full md:w-1/2 overflow-hidden">
          {!isImageLoaded && (
            <Skeleton className="w-full aspect-3/2 rounded-none" />
          )}
          <img
            src={galleryImage}
            alt="gallery"
            className={`w-full h-auto object-cover transition-opacity duration-300 ${
              isImageLoaded
                ? 'opacity-100'
                : 'opacity-0 absolute inset-0 h-full'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
        </div>
        <p className="w-full md:w-1/2 text-sm leading-relaxed">
          趣味で制作したPhotoshopの画像作品集です。
          写真のコラージュを中心に制作しています。
        </p>
      </motion.div>
    </motion.section>
  )
}

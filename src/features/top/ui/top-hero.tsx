import { useState } from 'react'
import { motion } from 'framer-motion'
import heroImage from '@/shared/assets/top/img-top-hero.webp'
import { Button } from '@/shared/ui'
import { Skeleton } from '@/shared/ui'

export const TopHero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section className="w-full">
      <div className="relative h-112 w-full overflow-hidden sm:h-128 md:h-152">
        {!isLoaded && <Skeleton className="h-full w-full rounded-none" />}
        <img
          src={heroImage}
          alt="hero"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="flex w-full max-w-4xl flex-col items-center gap-4 text-center text-white sm:gap-6">
            {/* テキスト：上からフェードイン */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="pointer-events-none flex max-w-xs flex-col items-center gap-1.5 text-sm leading-relaxed sm:max-w-2xl sm:gap-1 sm:text-base [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]"
            >
              <p className="text-lg font-bold tracking-widest sm:text-2xl">
                KAZUTAKA NAKAMURA
              </p>
              <p className="text-xs tracking-wider sm:text-base">
                フロントエンドエンジニア
              </p>
              <p className="tracking-wide">
                React / TypeScript / MicroCMS or WordPress
              </p>
              <p className="tracking-wide">
                Figmaデザインから、動きのある 高品質なWebサイトを実装します。
              </p>
              <p className="tracking-wide">
                LP・コーポレートサイト・Webアプリケーション開発承ります。
              </p>
            </motion.div>

            {/* ボタン：少し遅れてフェードイン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="flex w-full max-w-sm flex-row justify-center gap-2 sm:gap-3"
            >
              <Button
                type="button"
                className="h-10 flex-1 min-w-0 bg-white px-3 text-sm text-black hover:bg-white/90 hover:scale-105 active:scale-95 transition-transform duration-200 sm:h-11 sm:min-w-40 sm:px-6"
              >
                お問い合わせ
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 flex-1 min-w-0 border-white bg-transparent px-3 text-sm text-white hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 transition-transform duration-200 sm:h-11 sm:min-w-40 sm:px-6"
              >
                実績を見る
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useHeader } from './model'
import { HeaderNav, HeaderHamburger } from './ui'
import LogoSvg from '@/shared/assets/logo.svg?react'

export const HeaderContainer = () => {
  const { isOpen, open, close } = useHeader()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b"
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-8">
        {/* ロゴ */}
        <div className="flex items-center gap-2">
          {/* SVGをここに配置 */}
          <LogoSvg width={32} height={24} />
          <span className="font-semibold tracking-wider">
            Interact Infinity
          </span>
        </div>

        {/* デスクトップナビ */}
        <div className="hidden md:block">
          <HeaderNav />
        </div>

        {/* モバイルハンバーガー */}
        <div className="md:hidden">
          <HeaderHamburger isOpen={isOpen} onOpen={open} onClose={close} />
        </div>
      </div>
    </motion.header>
  )
}

import { useHeader } from './model'
import { HeaderNav, HeaderHamburger } from './ui'
import LogoSvg from '@/shared/assets/logo.svg?react'

export const HeaderContainer = () => {
  const { isOpen, open, close } = useHeader()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
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
    </header>
  )
}

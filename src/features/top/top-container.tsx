import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useApplications, useWorks, useWordpress } from '@/shared/hooks'
import { Button, MarqueeBackground } from '@/shared/ui'
import { PATHS } from '@/app/routes/paths'
import { TopHero, TopProfile } from './ui'
import { TopApplications } from './ui/top-applications'
import { TopContact } from './ui/top-contact'
import { TopWorks } from './ui/top-works'
import { TopWordpress } from './ui/top-wordpress'

// ─── BG カラー ─────────────────────────────────────────
const BG_COLORS: Record<string, string> = {
  pink: '#fce7f3',
  green: '#dcfce7',
  orange: '#ffe8cc',
  white: '#f8fafc',
}

// ─── うねうね白蛇SVG ───────────────────────────────────
const Snake = ({ position }: { position: 'top' | 'bottom' }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let id: number
    const dir = position === 'top' ? 1 : -1.3
    const animate = () => {
      setOffset((prev) => prev + 0.3 * dir)
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [position])

  const width = 420
  const height = 48
  const amplitude = position === 'top' ? 14 : 14
  const frequency = position === 'top' ? 28 : 28

  const points = Array.from({ length: Math.ceil(width / 4) + 1 }, (_, i) => {
    const x = i * 4
    const y = height / 2 + Math.sin((x + offset) / frequency) * amplitude
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  const isTop = position === 'top'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      style={{ display: 'block', height: `${height}px` }}
      preserveAspectRatio="none"
    >
      {isTop ? (
        <path d={`${points} L ${width} 0 L 0 0 Z`} fill="white" opacity={1} />
      ) : (
        <path
          d={`${points} L ${width} ${height} L 0 ${height} Z`}
          fill="white"
          opacity={1}
        />
      )}
      <path
        d={points}
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        opacity={1}
      />
    </svg>
  )
}

// ─── Hero キャプション（Canvas の直下に配置） ──────────
// ─── Hero セクション上端の波形ディバイダー（静的） ──────────
const HeroWave = () => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let id: number
    const animate = () => {
      setOffset((prev) => prev + 0.3)
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  const width = 420
  const height = 48
  const amplitude = 12
  const frequency = 30

  const points = Array.from({ length: Math.ceil(width / 4) + 1 }, (_, i) => {
    const x = i * 4
    const y = height / 2 + Math.sin((x + offset) / frequency) * amplitude
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      style={{ display: 'block', height: `${height}px` }}
      preserveAspectRatio="none"
    >
      <path
        d={`${points} L ${width} ${height} L 0 ${height} Z`}
        fill="#262626"
      />
    </svg>
  )
}

const HeroCaption = ({ bgColor: _bgColor }: { bgColor: string }) => {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="flex w-full max-w-xs flex-row justify-center gap-2"
      >
        <Button
          type="button"
          className="rounded-full px-8 py-3 bg-white text-[#333333] hover:bg-white/90 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          お問い合わせ
        </Button>
      </motion.div>
    </div>
  )
}

// ─── ナビゲーション定義 ────────────────────────────────
const NAV_ITEMS = [
  { label: 'TOP', path: PATHS.TOP },
  { label: 'PROFILE', path: PATHS.PROFILE },
  { label: 'WORKS', path: PATHS.WORKS },
  { label: 'WORDPRESS', path: PATHS.WORDPRESS },
  { label: 'APPLICATIONS', path: PATHS.APPLICATIONS },
  { label: 'CONTACT', path: PATHS.CONTACT },
]

// ─── TopContainer ──────────────────────────────────────
export const TopContainer = () => {
  const [bgColor, setBgColor] = useState('pink')
  const [menuOpen, setMenuOpen] = useState(false)
  const { applications, isLoading } = useApplications()
  const { works, isLoading: isWorksLoading } = useWorks()
  const { wordpresses, isLoading: isWordpressLoading } = useWordpress()

  return (
    <div
      className="w-full h-dvh flex items-center justify-center overflow-hidden transition-colors duration-1000 relative"
      style={{ backgroundColor: BG_COLORS[bgColor] }}
    >
      {/* マーキー背景（PCのみ表示） */}
      <MarqueeBackground />

      {/* スマホフレーム：mobile=フル画面 / md+=電話型枠 */}
      <div
        className={[
          'relative z-10 overflow-hidden transition-all duration-300',
          'w-full h-full',
          'md:w-107.5 md:h-[85dvh] md:rounded-[3.5rem] md:shadow-2xl md:border-4 md:border-white/80',
        ].join(' ')}
        style={{ backgroundColor: BG_COLORS[bgColor] }}
      >
        {/* ハンバーガーボタン（フレーム内） */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="メニュー"
          >
            <Menu size={22} className="text-slate-400" />
          </button>
        </div>

        {/* オーバーレイ（フレーム基準・absolute） */}
        {menuOpen && (
          <div
            className="absolute inset-0 z-40 bg-black/20"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* スライドインドロワー（フレーム基準・absolute） */}
        <div
          className="absolute top-0 right-0 bottom-0 z-50 flex flex-col bg-white shadow-2xl transition-[width] duration-300 ease-in-out"
          style={{ width: menuOpen ? '75%' : '0%', overflow: 'hidden' }}
        >
          <div className="shrink-0 px-6 pt-6 pb-2 flex items-center justify-between">
            <span className="text-sm font-semibold tracking-widest text-slate-700">
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="閉じる"
              className="p-2 rounded-lg hover:bg-black/5 transition-colors"
            >
              <X size={22} className="text-slate-500" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 pt-6">
            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-base font-medium tracking-widest underline underline-offset-4 text-slate-900'
                        : 'text-base font-medium tracking-widest text-slate-700 hover:opacity-60 transition-opacity'
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 上の白蛇（固定） */}
        <div className="absolute top-0 inset-x-0 z-60 pointer-events-none">
          <Snake position="top" />
        </div>

        {/* Canvas：フレーム内固定背景 */}
        <div className="absolute inset-0 z-0">
          <TopHero onColorChange={setBgColor} />
        </div>

        {/* スクロールコンテンツ（Canvas の上を流れる） */}
        <div className="absolute inset-0 z-10 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* 透明スペーサー：最初の1画面は Canvas を見せる */}
          <div className="h-full w-full shrink-0" />

          {/* Hero 波形ディバイダー */}
          <HeroWave />

          {/* Hero キャプション */}
          <div style={{ backgroundColor: '#262626' }}>
            <HeroCaption bgColor={bgColor} />
          </div>

          {/* Profile */}
          <section
            id="phone-profile"
            className="px-6 py-10 text-white"
            style={{ backgroundColor: '#262626' }}
          >
            <TopProfile />
          </section>

          {/* Works */}
          <section
            id="phone-works"
            className="px-6 py-10 text-white"
            style={{ backgroundColor: '#262626' }}
          >
            <TopWorks works={works} isLoading={isWorksLoading} />
          </section>

          {/* WordPress */}
          <section
            id="phone-wordpress"
            className="px-6 py-10 text-white"
            style={{ backgroundColor: '#262626' }}
          >
            <TopWordpress
              wordpresses={wordpresses}
              isLoading={isWordpressLoading}
            />
          </section>

          {/* Applications */}
          <section
            id="phone-applications"
            className="px-6 py-10 text-white"
            style={{ backgroundColor: '#262626' }}
          >
            <TopApplications
              applications={applications}
              isLoading={isLoading}
            />
          </section>

          {/* Contact */}
          <section
            id="phone-contact"
            className="px-6 py-10 pb-20 text-white"
            style={{ backgroundColor: '#262626' }}
          >
            <TopContact />
          </section>
        </div>

        {/* 下の白蛇（固定） */}
        <div className="absolute bottom-0 inset-x-0 z-60 pointer-events-none">
          <Snake position="bottom" />
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { PATHS } from '@/app/routes/paths'

// ─── BG カラー ──────────────────────────────────────
const BG_COLORS: Record<string, string> = {
  pink: '#fce7f3',
  green: '#dcfce7',
  orange: '#ffe8cc',
  white: '#f8fafc',
}
const BG_CYCLE = ['pink', 'green', 'orange', 'white'] as const
const CYCLE_DURATION_MS = 5000

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
  const amplitude = 14
  const frequency = 28

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
        <path d={`${points} L ${width} 0 L 0 0 Z`} fill="white" />
      ) : (
        <path
          d={`${points} L ${width} ${height} L 0 ${height} Z`}
          fill="white"
        />
      )}
      <path d={points} fill="none" stroke="white" strokeWidth="2.5" />
    </svg>
  )
}
// ─── マーキー背景テキスト ────────────────────────────────
const MARQUEE_ROWS = [
  { text: 'Internet', direction: 'ltr' as const, duration: 30 },
  { text: 'Interact', direction: 'rtl' as const, duration: 25 },
  { text: 'Infinity', direction: 'ltr' as const, duration: 28 },
]

const MarqueeRow = ({
  text,
  direction,
  duration,
}: {
  text: string
  direction: 'ltr' | 'rtl'
  duration: number
}) => {
  const indices = Array.from({ length: 8 }, (_, i) => i)
  const animName = direction === 'rtl' ? 'marquee-rtl' : 'marquee-ltr'
  const renderItems = (keyPrefix: string) =>
    indices.map((i) => (
      <span key={`${keyPrefix}-${i}`} className="mx-6 shrink-0">
        {text}
      </span>
    ))
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex whitespace-nowrap font-bold text-slate-300/25"
        style={{
          fontSize: '5rem',
          animation: `${animName} ${duration}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{renderItems('a')}</div>
        <div className="flex shrink-0">{renderItems('b')}</div>
      </div>
    </div>
  )
}

export const MarqueeBackground = () => (
  <div className="absolute inset-0 hidden md:flex flex-col justify-around overflow-hidden pointer-events-none">
    {MARQUEE_ROWS.map((row) => (
      <MarqueeRow key={row.text} {...row} />
    ))}
  </div>
)
// ─── ナビゲーション定義 ────────────────────────────────
const NAV_ITEMS = [
  { label: 'TOP', path: PATHS.TOP },
  { label: 'PROFILE', path: PATHS.PROFILE },
  { label: 'WORKS', path: PATHS.WORKS },
  { label: 'WORDPRESS', path: PATHS.WORDPRESS },
  { label: 'APPLICATIONS', path: PATHS.APPLICATIONS },
  { label: 'CONTACT', path: PATHS.CONTACT },
]

// ─── PageShell ────────────────────────────────────────
type Props = {
  children: ReactNode
}

export const PageShell = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bgKey, setBgKey] = useState<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBgKey((prev) => (prev + 1) % BG_CYCLE.length)
    }, CYCLE_DURATION_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const outerBg = BG_COLORS[BG_CYCLE[bgKey]]

  return (
    <div
      className="w-full h-dvh flex items-center justify-center overflow-hidden transition-colors duration-1000 relative"
      style={{ backgroundColor: outerBg }}
    >
      {/* マーキー背景（PCのみ表示） */}
      <MarqueeBackground />

      {/* スマホフレーム：mobile=フル画面 / md+=電話型枠 */}
      <div
        className={[
          'relative z-10 overflow-hidden transition-all duration-300',
          'w-full h-full',
          'md:w-107.5 md:h-[85dvh] md:rounded-[3.5rem] md:shadow-2xl md:border-4 md:border-white',
        ].join(' ')}
        style={{ backgroundColor: '#262626' }}
      >
        {/* ハンバーガーボタン */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="メニュー"
          >
            <Menu size={22} className="text-slate-400" />
          </button>
        </div>

        {/* オーバーレイ */}
        {menuOpen && (
          <div
            className="absolute inset-0 z-40 bg-black/20"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* スライドインドロワー */}
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

        {/* スクロールコンテンツ */}
        <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>

        {/* 下の白蛇（固定） */}
        <div className="absolute bottom-0 inset-x-0 z-60 pointer-events-none">
          <Snake position="bottom" />
        </div>
      </div>
    </div>
  )
}

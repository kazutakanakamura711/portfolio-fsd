import { useEffect } from 'react'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import { routes } from '@/app/routes'

declare const gtag: (...args: unknown[]) => void

const AppRoutes = () => {
  const element = useRoutes(routes)
  const location = useLocation()

  useEffect(() => {
    if (typeof gtag === 'undefined') return
    gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
    })
  }, [location])

  // 全ページ PageShell 内で独自レイアウトを持つため wrapper なし
  return <>{element}</>
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

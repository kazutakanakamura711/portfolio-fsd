import { useEffect } from 'react'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import { routes } from '@/app/routes'
import { HeaderContainer } from '@/widgets/header'
import { FooterContainer } from '@/widgets/footer'

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

  return (
    <>
      <HeaderContainer />
      <main className="max-w-6xl mx-auto px-4 py-20 md:px-8">{element}</main>
      <FooterContainer />
    </>
  )
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

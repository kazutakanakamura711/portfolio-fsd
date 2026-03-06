import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from '@/app/routes'
import { HeaderContainer } from '@/widgets/header'
import { FooterContainer } from '@/widgets/footer'

const AppRoutes = () => {
  const element = useRoutes(routes)
  return (
    <>
      <HeaderContainer />
      <main className="pt-14">{element}</main>
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

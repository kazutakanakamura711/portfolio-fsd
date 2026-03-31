import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderNav } from './header-nav'

const renderWithRouter = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <HeaderNav />
    </MemoryRouter>
  )
}

describe('HeaderNav', () => {
  it('全ナビゲーション項目が表示される', () => {
    renderWithRouter()
    expect(screen.getByText('TOP')).toBeInTheDocument()
    expect(screen.getByText('PROFILE')).toBeInTheDocument()
    expect(screen.getByText('WORKS')).toBeInTheDocument()
    expect(screen.getByText('WORDPRESS')).toBeInTheDocument()
    expect(screen.getByText('APPLICATIONS')).toBeInTheDocument()
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
  })

  it('各項目がリンクになっている', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'TOP' })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: 'PROFILE' })).toHaveAttribute(
      'href',
      '/profile'
    )
    expect(screen.getByRole('link', { name: 'WORKS' })).toHaveAttribute(
      'href',
      '/works'
    )
    expect(screen.getByRole('link', { name: 'WORDPRESS' })).toHaveAttribute(
      'href',
      '/wordpress'
    )
    expect(screen.getByRole('link', { name: 'APPLICATIONS' })).toHaveAttribute(
      'href',
      '/applications'
    )
    expect(screen.getByRole('link', { name: 'CONTACT' })).toHaveAttribute(
      'href',
      '/contact'
    )
  })
})

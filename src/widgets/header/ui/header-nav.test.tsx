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
    expect(screen.getByText('APPLICATIONS')).toBeInTheDocument()
    expect(screen.getByText('GALLERY')).toBeInTheDocument()
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
    expect(screen.getByRole('link', { name: 'APPLICATIONS' })).toHaveAttribute(
      'href',
      '/applications'
    )
    expect(screen.getByRole('link', { name: 'GALLERY' })).toHaveAttribute(
      'href',
      '/gallery'
    )
  })
})

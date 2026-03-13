import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderContainer } from './header-container'

const renderWithRouter = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <HeaderContainer />
    </MemoryRouter>
  )
}

describe('HeaderContainer', () => {
  it('ロゴテキストが表示される', () => {
    renderWithRouter()
    expect(screen.getByText('Interact Infinity')).toBeInTheDocument()
  })

  it('デスクトップナビが表示される', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('ハンバーガーボタンが表示される', () => {
    renderWithRouter()
    expect(
      screen.getByRole('button', { name: 'メニューを開く' })
    ).toBeInTheDocument()
  })
})

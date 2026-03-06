import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HeaderHamburger } from './header-hamburger'

const renderWithRouter = (props = {}) => {
  const defaultProps = {
    isOpen: false,
    onOpen: vi.fn(),
    onClose: vi.fn(),
  }
  return render(
    <MemoryRouter>
      <HeaderHamburger {...defaultProps} {...props} />
    </MemoryRouter>
  )
}

describe('HeaderHamburger', () => {
  it('ハンバーガーボタンが表示される', () => {
    renderWithRouter()
    expect(
      screen.getByRole('button', { name: 'メニューを開く' })
    ).toBeInTheDocument()
  })

  it('ボタンをクリックするとonOpenが呼ばれる', async () => {
    const onOpen = vi.fn()
    renderWithRouter({ onOpen })
    await userEvent.click(
      screen.getByRole('button', { name: 'メニューを開く' })
    )
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('isOpenがtrueの時にメニュー項目が表示される', () => {
    renderWithRouter({ isOpen: true })
    expect(screen.getByText('TOP')).toBeInTheDocument()
    expect(screen.getByText('PROFILE')).toBeInTheDocument()
    expect(screen.getByText('APPLICATIONS')).toBeInTheDocument()
    expect(screen.getByText('GALLERY')).toBeInTheDocument()
  })

  it('メニュー項目をクリックするとonCloseが呼ばれる', async () => {
    const onClose = vi.fn()
    renderWithRouter({ isOpen: true, onClose })
    await userEvent.click(screen.getByText('TOP'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

import { render, screen } from '@testing-library/react'
import { Footer } from './footer'

describe('Footer', () => {
  it('コピーライトが表示される', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(`© ${currentYear} Kazutaka Nakamura`)
    ).toBeInTheDocument()
  })

  it('使用技術が表示される', () => {
    render(<Footer />)
    expect(screen.getByText(/React/)).toBeInTheDocument()
  })
})

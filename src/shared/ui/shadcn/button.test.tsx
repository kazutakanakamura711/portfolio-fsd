import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('テキストが表示される', () => {
    render(<Button>クリック</Button>)
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument()
  })

  it('クリックイベントが発火する', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>クリック</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled時はクリックできない', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        クリック
      </Button>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('variantがghostの時に表示される', () => {
    render(<Button variant="ghost">ゴースト</Button>)
    expect(screen.getByRole('button', { name: 'ゴースト' })).toBeInTheDocument()
  })
})

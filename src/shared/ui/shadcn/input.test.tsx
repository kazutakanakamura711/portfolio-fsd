import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('入力フィールドが表示される', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('プレースホルダーが表示される', () => {
    render(<Input placeholder="テスト" />)
    expect(screen.getByPlaceholderText('テスト')).toBeInTheDocument()
  })

  it('テキストを入力できる', async () => {
    const user = userEvent.setup()
    render(<Input />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'テスト入力')
    expect(input).toHaveValue('テスト入力')
  })

  it('type="email"の場合、メールアドレスの入力フィールドになる', () => {
    render(<Input type="email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('type="password"の場合、パスワード入力フィールドになる', () => {
    render(<Input type="password" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('disabled時は入力できない', async () => {
    const user = userEvent.setup()
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'テスト')
    expect(input).toHaveValue('')
  })

  it('defaultValueが設定される', () => {
    render(<Input defaultValue="初期値" />)
    expect(screen.getByDisplayValue('初期値')).toBeInTheDocument()
  })

  it('changeイベントが発火する', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'a')
    expect(handleChange).toHaveBeenCalled()
  })
})

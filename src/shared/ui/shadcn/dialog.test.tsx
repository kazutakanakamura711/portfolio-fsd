import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'

const renderDialog = (defaultOpen = false) => {
  return render(
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger>開く</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>タイトル</DialogTitle>
          <DialogDescription>説明</DialogDescription>
        </DialogHeader>
        <p>コンテンツ</p>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('トリガーボタンが表示される', () => {
    renderDialog()
    expect(screen.getByText('開く')).toBeInTheDocument()
  })

  it('デフォルトではコンテンツが表示されない', () => {
    renderDialog()
    expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument()
  })

  it('トリガーをクリックするとコンテンツが表示される', async () => {
    renderDialog()
    await userEvent.click(screen.getByText('開く'))
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()
  })

  it('タイトルと説明が表示される', () => {
    renderDialog(true)
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('説明')).toBeInTheDocument()
  })

  it('閉じるボタンをクリックするとコンテンツが非表示になる', async () => {
    renderDialog(true)
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

const renderSheet = (isOpen = false) => {
  return render(
    <Sheet defaultOpen={isOpen}>
      <SheetTrigger>開く</SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>タイトル</SheetTitle>
        </SheetHeader>
        <p>コンテンツ</p>
      </SheetContent>
    </Sheet>
  )
}

describe('Sheet', () => {
  it('トリガーボタンが表示される', () => {
    renderSheet()
    expect(screen.getByText('開く')).toBeInTheDocument()
  })

  it('デフォルトではコンテンツが表示されない', () => {
    renderSheet()
    expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument()
  })

  it('トリガーをクリックするとコンテンツが表示される', async () => {
    renderSheet()
    await userEvent.click(screen.getByText('開く'))
    expect(screen.getByText('コンテンツ')).toBeInTheDocument()
  })

  it('タイトルが表示される', () => {
    renderSheet(true)
    expect(screen.getByText('タイトル')).toBeInTheDocument()
  })

  it('閉じるボタンをクリックするとコンテンツが非表示になる', async () => {
    renderSheet(true)
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument()
  })
})

import { render } from '@testing-library/react'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('skeletonが描画される', () => {
    const { container } = render(<Skeleton className="h-6 w-24" />)
    const element = container.querySelector('[data-slot="skeleton"]')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('animate-pulse')
  })
})

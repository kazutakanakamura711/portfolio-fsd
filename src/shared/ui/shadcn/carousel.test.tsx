import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'

const mockApi = {
  canScrollPrev: vi.fn(() => true),
  canScrollNext: vi.fn(() => true),
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
}

vi.mock('embla-carousel-react', () => ({
  default: vi.fn(() => [vi.fn(), mockApi]),
}))

describe('Carousel', () => {
  it('スライドを表示できる', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('前後ボタンでスクロール関数を呼び出せる', async () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    await userEvent.click(
      screen.getByRole('button', { name: 'Previous slide' })
    )
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }))

    expect(mockApi.scrollPrev).toHaveBeenCalledTimes(1)
    expect(mockApi.scrollNext).toHaveBeenCalledTimes(1)
  })
})

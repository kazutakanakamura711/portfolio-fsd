import type { Meta, StoryObj } from '@storybook/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'
import { Card, CardContent } from './card'

const meta = {
  title: 'Shared/UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-md px-12">
      <Carousel opts={{ align: 'start', loop: true }}>
        <CarouselContent>
          {[1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center">
                  <span className="text-2xl font-semibold">Slide {index}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="mx-auto max-w-md px-12">
      <Carousel
        orientation="vertical"
        className="h-[320px]"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[320px]">
          {[1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex h-[100px] items-center justify-center">
                  <span className="text-lg font-semibold">Item {index}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

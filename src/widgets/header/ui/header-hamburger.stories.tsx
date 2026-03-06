import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderHamburger } from './header-hamburger'

const meta = {
  title: 'Widgets/Header/HeaderHamburger',
  component: HeaderHamburger,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof HeaderHamburger>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
  },
}

export const Opened: Story = {
  args: {
    isOpen: true,
    onOpen: () => {},
    onClose: () => {},
  },
}

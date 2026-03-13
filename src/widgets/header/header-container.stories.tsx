import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderContainer } from './header-container'

const meta = {
  title: 'Widgets/Header/HeaderContainer',
  component: HeaderContainer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof HeaderContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

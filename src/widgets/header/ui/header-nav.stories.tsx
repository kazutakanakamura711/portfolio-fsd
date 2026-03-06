import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { HeaderNav } from './header-nav'

const meta = {
  title: 'Widgets/Header/HeaderNav',
  component: HeaderNav,
  tags: ['autodocs'],
  // decorators を meta から削除
} satisfies Meta<typeof HeaderNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const ActiveTop: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const ActiveProfile: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/profile']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

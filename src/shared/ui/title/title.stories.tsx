import type { Meta, StoryObj } from '@storybook/react'
import { Title } from './title'
import { Heading, AlignSelf } from './title.types'

const meta = {
  title: 'Shared/UI/Title',
  component: Title,
  tags: ['autodocs'],
  args: {
    children: 'TITLE',
  },
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const H1: Story = {
  args: {
    as: Heading.H1,
    children: 'Heading H1',
  },
}

export const H3: Story = {
  args: {
    as: Heading.H3,
    children: 'Heading H3',
  },
}

export const AlignStart: Story = {
  args: {
    alignSelf: AlignSelf.Start,
    children: 'Align Start',
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col w-64 border border-dashed border-gray-300 p-4">
        <Story />
      </div>
    ),
  ],
}

export const AlignCenter: Story = {
  args: {
    alignSelf: AlignSelf.Center,
    children: 'Align Center',
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col w-64 border border-dashed border-gray-300 p-4">
        <Story />
      </div>
    ),
  ],
}

export const AlignEnd: Story = {
  args: {
    alignSelf: AlignSelf.End,
    children: 'Align End',
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col w-64 border border-dashed border-gray-300 p-4">
        <Story />
      </div>
    ),
  ],
}

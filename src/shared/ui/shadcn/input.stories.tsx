import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta = {
  title: 'Shared/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'プレースホルダーテキスト',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'example@email.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'パスワード',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'この入力は無効です',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'プレースホルダーテキスト',
    defaultValue: '入力値の例',
  },
}

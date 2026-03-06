import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from './button'

const meta = {
  title: 'Shared/UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Portfolio App</CardTitle>
        <CardDescription>FSD + React + TypeScript</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          このカードはアプリ情報の表示サンプルです。
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">詳細を見る</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>通知</CardTitle>
        <CardDescription>未読メッセージがあります。</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            既読にする
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          新しいお知らせが2件あります。
        </p>
      </CardContent>
    </Card>
  ),
}

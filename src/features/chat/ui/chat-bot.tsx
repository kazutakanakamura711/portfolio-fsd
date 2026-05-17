import { useState, useRef, useEffect } from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { sendChatMessage } from '@/shared/api/chat'
import IcoChatSvg from '@/shared/assets/ico-chat.svg?react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'こんにちは！スキルや料金など、お気軽にご質問ください。',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const reply = await sendChatMessage(userMessage)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'エラーが発生しました。しばらくしてからお試しください。',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* モーダルオーバーレイ */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50" />
      )}

      <div className="fixed bottom-6 right-6 z-70 md:right-[calc((100vw-26.875rem)/2+1.5rem)] md:bottom-[calc(15dvh/2+1.5rem)]">
        {/* チャットウィンドウ */}
        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mb-4 w-80 rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md"
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-white/20 px-4 py-3">
              <span className="text-sm font-medium text-foreground">
                お問い合わせ
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* メッセージ一覧 */}
            <div className="flex h-72 flex-col gap-2 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-white/20 text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="max-w-[85%] rounded-xl bg-white/20 px-3 py-2 text-sm text-muted-foreground">
                  入力中...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 入力エリア */}
            <div className="flex gap-2 border-t border-white/20 p-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                className="bg-white/10 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="sm"
              >
                送信
              </Button>
            </div>
          </div>
        )}

        {/* フローティングボタン（チャットが閉じている時のみ表示） */}
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="チャットを開く"
            className="relative flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.08),
      0 2px 8px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(0, 0, 0, 0.04)
    `,
            }}
          >
            {/* 内側の光沢 */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 60%)',
                pointerEvents: 'none',
              }}
            />
            <IcoChatSvg className="relative h-6 w-6" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </>
  )
}

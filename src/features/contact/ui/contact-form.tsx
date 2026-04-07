import type { ComponentProps } from 'react'

import { Button } from '@/shared/ui'
import type { ContactFormState } from '../model'

type ContactFormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>

type Props = {
  form: ContactFormState
  isSending: boolean
  errorMessage: string
  successMessage: string
  isEmailjsConfigured: boolean
  setField: (field: keyof ContactFormState, value: string) => void
  onSubmit: ContactFormSubmitHandler
}

export const ContactForm = ({
  form,
  isSending,
  errorMessage,
  successMessage,
  isEmailjsConfigured,
  setField,
  onSubmit,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          お名前 <span className="text-red-600">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={(event) => setField('name', event.target.value)}
          className="h-11 rounded-md border border-input bg-background px-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground"
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          メールアドレス <span className="text-red-600">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => setField('email', event.target.value)}
          className="h-11 rounded-md border border-input bg-background px-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground"
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-sm font-medium">
          件名
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={(event) => setField('subject', event.target.value)}
          className="h-11 rounded-md border border-input bg-background px-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          お問い合わせ内容 <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(event) => setField('message', event.target.value)}
          className="min-h-40 rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground"
        />
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        value={form.website}
        onChange={(event) => setField('website', event.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {errorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="text-sm text-emerald-700" role="status">
          {successMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        className="h-11 w-full transition-transform duration-200 hover:scale-105 active:scale-95"
        disabled={isSending || !isEmailjsConfigured}
      >
        {isSending ? '送信中...' : '送信する'}
      </Button>

      {!isEmailjsConfigured ? (
        <p className="text-xs text-muted-foreground">
          現在、お問い合わせフォームはご利用いただけません。
        </p>
      ) : null}
    </form>
  )
}

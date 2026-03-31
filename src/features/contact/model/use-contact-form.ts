import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import {
  contactFormSchema,
  initialContactFormState,
  type ContactFormState,
} from './schema/contact-form-schema'

export const useContactForm = () => {
  const [form, setForm] = useState<ContactFormState>(initialContactFormState)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const emailjsConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      toEmail: import.meta.env.VITE_CONTACT_TO_EMAIL,
    }),
    []
  )

  const isEmailjsConfigured =
    Boolean(emailjsConfig.serviceId) &&
    Boolean(emailjsConfig.templateId) &&
    Boolean(emailjsConfig.publicKey)

  const setField = (field: keyof ContactFormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const resetStatus = () => {
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    resetStatus()

    if (!isEmailjsConfigured) {
      setErrorMessage(
        'EmailJS の環境変数が未設定です。README の設定手順を確認してください。'
      )
      return
    }

    if (form.website.trim()) {
      setSuccessMessage('送信ありがとうございました。')
      setForm(initialContactFormState)
      return
    }

    const parsed = contactFormSchema.safeParse(form)
    if (!parsed.success) {
      setErrorMessage(
        parsed.error.issues[0]?.message ?? '入力内容をご確認ください。'
      )
      return
    }

    const validatedForm = parsed.data

    setIsSending(true)

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: validatedForm.name,
          reply_to: validatedForm.email,
          subject: validatedForm.subject || 'お問い合わせ',
          message: validatedForm.message,
          to_email: emailjsConfig.toEmail || undefined,
        },
        { publicKey: emailjsConfig.publicKey }
      )

      setSuccessMessage(
        '送信ありがとうございました。2営業日以内にご返信します。'
      )
      setForm(initialContactFormState)
    } catch {
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setIsSending(false)
    }
  }

  return {
    form,
    isSending,
    errorMessage,
    successMessage,
    isEmailjsConfigured,
    setField,
    handleSubmit,
  }
}

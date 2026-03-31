import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'お名前は必須です。'),
  email: z
    .string()
    .trim()
    .min(1, 'メールアドレスは必須です。')
    .email('メールアドレスの形式が正しくありません。'),
  subject: z.string().trim(),
  message: z.string().trim().min(1, 'お問い合わせ内容は必須です。'),
  website: z.string(),
})

export type ContactFormState = z.input<typeof contactFormSchema>

export const initialContactFormState: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

import { motion } from 'framer-motion'

import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Title } from '@/shared/ui'
import { useContactForm } from './model'
import { ContactForm } from './ui'

export const ContactContainer = () => {
  const {
    form,
    isSending,
    errorMessage,
    successMessage,
    isEmailjsConfigured,
    setField,
    handleSubmit,
  } = useContactForm()

  return (
    <motion.section
      className="mx-auto flex w-full max-w-3xl flex-col gap-10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeInDown} className="self-center">
        <Title>CONTACT</Title>
      </motion.div>

      <motion.p
        variants={fadeInUp}
        className="text-center text-sm leading-relaxed text-muted-foreground"
      >
        制作のご相談・お見積りのご依頼など、お気軽にお問い合わせください。
      </motion.p>

      <motion.div variants={fadeInUp}>
        <ContactForm
          form={form}
          isSending={isSending}
          errorMessage={errorMessage}
          successMessage={successMessage}
          isEmailjsConfigured={isEmailjsConfigured}
          setField={setField}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </motion.section>
  )
}

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { Button } from '@/shared/ui'
import { PATHS } from '@/app/routes/paths'

export const TopContact = () => {
  const navigate = useNavigate()

  const handleContact = () => {
    navigate(PATHS.CONTACT)
  }

  return (
    <motion.section
      className="flex flex-col gap-8 text-center"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={fadeInDown}
        className="text-2xl font-medium tracking-super-wide"
      >
        CONTACT
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        className="text-sm leading-relaxed mx-auto max-w-md"
      >
        ご不明な点やご質問がある場合は、
        <br />
        お気軽にお問い合わせください。
      </motion.p>

      <motion.div variants={fadeInUp} className="flex justify-center">
        <Button onClick={handleContact} className="px-8 py-3 rounded-full">
          お問い合わせ
        </Button>
      </motion.div>
    </motion.section>
  )
}

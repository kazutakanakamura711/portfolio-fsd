import { motion } from 'framer-motion'
import { Heading, Title } from '@/shared/ui'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { ProfileHero, ProfileCareer, ProfileSkills, ProfileSns } from './ui'

export const ProfileContainer = () => {
  return (
    <motion.div
      className="flex flex-col gap-8 max-w-2xl mx-auto"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeInDown} className="self-center">
        <Title as={Heading.H1}>PROFILE</Title>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <ProfileHero />
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-8 bg-white/80 p-6 md:p-10 overflow-hidden wrap-break-word"
      >
        <ProfileCareer />
        <ProfileSkills />
        <ProfileSns />
      </motion.div>
    </motion.div>
  )
}

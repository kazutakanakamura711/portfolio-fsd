import { motion } from 'framer-motion'
import { Heading, Title } from '@/shared/ui'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { useProfile } from '@/shared/hooks'
import { ProfileHero, ProfileCareer, ProfileSkills } from './ui'

export const ProfileContainer = () => {
  const { profile, isLoading } = useProfile()

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
      {!isLoading && profile && (
        <>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <ProfileHero image={profile.image} name={profile.name} />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 bg-white/80 p-6 md:p-10 overflow-hidden wrap-break-word"
          >
            <ProfileCareer about={profile.about} />
            <ProfileSkills
              programming_lang={profile.programming_lang}
              framework={profile.framework}
              ui_library={profile.ui_library}
              state_library={profile.state_library}
              api={profile.api}
              orm={profile.orm}
              test_tool={profile.test_tool}
              cms={profile.cms}
              task_management={profile.task_management}
              communication={profile.communication}
              ai_tool={profile.ai_tool}
              other={profile.other}
            />
            {/* <ProfileSns /> */}
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

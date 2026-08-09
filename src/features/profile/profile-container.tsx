import { motion } from 'framer-motion'
import { Heading, Title, PageShell } from '@/shared/ui'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { useProfile } from '@/shared/hooks'
import {
  ProfileHero,
  ProfileCareer,
  ProfileTimeline,
  ProfileSkills,
} from './ui'

export const ProfileContainer = () => {
  const { profile, isLoading } = useProfile()

  return (
    <PageShell>
      <div
        className="px-6 py-16 pb-20 text-white"
        style={{ backgroundColor: '#262626' }}
      >
        <motion.div
          className="flex flex-col gap-8"
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
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <ProfileHero image={profile.image} name={profile.name} />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-8 bg-white/10 p-6 overflow-hidden wrap-break-word rounded-2xl"
              >
                <ProfileCareer about={profile.about} />
                <ProfileTimeline careers={profile.careers} />
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
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </PageShell>
  )
}

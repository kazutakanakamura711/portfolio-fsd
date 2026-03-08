import { Heading, Title } from '@/shared/ui'
import { ProfileHero, ProfileCareer, ProfileSkills, ProfileSns } from './ui'

export const ProfileContainer = () => {
  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <Title as={Heading.H1}>PROFILE</Title>
      <ProfileHero />
      <div className="flex flex-col gap-8 bg-white/80 p-6 md:p-10 overflow-hidden wrap-break-word">
        <ProfileCareer />
        <ProfileSkills />
        <ProfileSns />
      </div>
    </div>
  )
}

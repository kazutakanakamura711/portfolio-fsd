import { useApplications, useWorks } from '@/shared/hooks'
import { TopHero, TopProfile } from './ui'
import { TopApplications } from './ui/top-applications'
import { TopGallery } from './ui/top-gallery'
import { TopContact } from './ui/top-contact'
import { TopWorks } from './ui/top-works'

export const TopContainer = () => {
  const { applications, isLoading } = useApplications()
  const { works, isLoading: isWorksLoading } = useWorks()

  return (
    <div className="flex flex-col gap-32">
      <TopHero />
      <TopProfile />
      <TopWorks works={works} isLoading={isWorksLoading} />
      <TopApplications applications={applications} isLoading={isLoading} />
      <TopGallery />
      <TopContact />
    </div>
  )
}

import { useApplications } from '@/shared/hooks'
import { TopHero, TopProfile } from './ui'
import { TopApplications } from './ui/top-applications'
import { TopGallery } from './ui/top-gallery'

export const TopContainer = () => {
  const { applications, isLoading } = useApplications()

  return (
    <div className="flex flex-col gap-32">
      <TopHero />
      <TopProfile />
      <TopApplications applications={applications} isLoading={isLoading} />
      <TopGallery />
    </div>
  )
}

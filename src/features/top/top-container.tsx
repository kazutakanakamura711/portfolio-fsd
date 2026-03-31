import { useApplications, useWorks, useWordpress } from '@/shared/hooks'
import { TopHero, TopProfile } from './ui'
import { TopApplications } from './ui/top-applications'
import { TopContact } from './ui/top-contact'
import { TopWorks } from './ui/top-works'
import { TopWordpress } from './ui/top-wordpress'

export const TopContainer = () => {
  const { applications, isLoading } = useApplications()
  const { works, isLoading: isWorksLoading } = useWorks()
  const { wordpresses, isLoading: isWordpressLoading } = useWordpress()

  return (
    <div className="flex flex-col gap-32">
      <TopHero />
      <TopProfile />
      <TopWorks works={works} isLoading={isWorksLoading} />
      <TopWordpress wordpresses={wordpresses} isLoading={isWordpressLoading} />
      <TopApplications applications={applications} isLoading={isLoading} />
      <TopContact />
    </div>
  )
}

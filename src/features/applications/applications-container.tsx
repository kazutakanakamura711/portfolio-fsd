import { Heading, Title, Skeleton } from '@/shared/ui'
import { ApplicationsList } from './ui'
import { useApplications } from '@/shared/hooks'

const ApplicationsSkeleton = () => (
  <div className="flex flex-col gap-8">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col md:flex-row gap-8 border-t pt-8">
        <Skeleton className="w-full md:w-1/2 aspect-3/2" />
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
)

export const ApplicationsContainer = () => {
  const { applications, isLoading } = useApplications()

  return (
    <div className="flex flex-col gap-8">
      <Title as={Heading.H1}>APPLICATIONS</Title>
      {isLoading ? (
        <ApplicationsSkeleton />
      ) : (
        <ApplicationsList applications={applications} />
      )}
    </div>
  )
}

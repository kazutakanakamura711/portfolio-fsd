import { Heading, Skeleton, Title } from '@/shared/ui'
import { useWorks } from '@/shared/hooks'

import { WorksList } from './ui'

const WorksSkeleton = () => (
  <div className="flex flex-col gap-8 animate-in fade-in duration-300">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className={`flex flex-col md:flex-row gap-8 border-t pt-8 ${
          i % 2 !== 0 ? 'md:flex-row-reverse' : ''
        }`}
      >
        <Skeleton className="w-full md:w-1/2 aspect-3/2" />
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
)

export const WorksContainer = () => {
  const { works, isLoading } = useWorks()

  return (
    <div className="flex flex-col gap-8">
      <Title as={Heading.H1}>WORKS</Title>
      {isLoading ? <WorksSkeleton /> : <WorksList works={works} />}
    </div>
  )
}

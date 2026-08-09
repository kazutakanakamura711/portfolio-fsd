import { motion } from 'framer-motion'

import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { useProjects } from '@/shared/hooks'
import { Heading, PageShell, Skeleton, Title } from '@/shared/ui'
import { LpList } from './ui'

const LpSkeleton = () => (
  <div className="flex flex-col gap-8 animate-in fade-in duration-300">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex flex-col gap-8 border-t pt-8">
        <Skeleton className="w-full aspect-3/2" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
)

export const LpContainer = () => {
  const { projects: landingPages, isLoading } = useProjects('lp')

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
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeInDown} className="self-center">
            <Title as={Heading.H1}>LANDING PAGES</Title>
          </motion.div>
          <motion.div variants={fadeInUp}>
            {isLoading ? (
              <LpSkeleton />
            ) : (
              <LpList landingPages={landingPages} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  )
}

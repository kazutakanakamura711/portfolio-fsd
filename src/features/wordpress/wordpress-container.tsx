import { motion } from 'framer-motion'
import { Heading, Title, Skeleton, PageShell } from '@/shared/ui'
import { useProjects } from '@/shared/hooks'
import { fadeInDown, fadeInUp, staggerContainer } from '@/shared/lib/animations'
import { WordpressList } from './ui'

const WordpressSkeleton = () => (
  <div className="flex flex-col gap-8 animate-in fade-in duration-300">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-8 border-t pt-8">
        <Skeleton className="w-full aspect-3/2" />
        <div className="flex flex-col gap-4">
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

export const WordpressContainer = () => {
  const { projects: wordpresses, isLoading } = useProjects('wordpress')

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
            <Title as={Heading.H1}>WORDPRESS</Title>
          </motion.div>
          <motion.div variants={fadeInUp}>
            {isLoading ? (
              <WordpressSkeleton />
            ) : (
              <WordpressList wordpresses={wordpresses} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  )
}

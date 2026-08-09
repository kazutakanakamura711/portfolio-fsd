import { useEffect, useState } from 'react'

import type { Projects } from '@/entities/microcms/projects'
import { client } from '@/shared/api/microcms'

export const PROJECT_TYPES = ['application', 'work', 'wordpress', 'lp'] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

type UseProjectsResult = {
  projects: Projects[]
  isLoading: boolean
}

export const useProjects = (type?: ProjectType): UseProjectsResult => {
  const [projects, setProjects] = useState<Projects[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchProjects = async () => {
      try {
        const response = await client.getList<Projects>({
          endpoint: 'projects',
          queries: type ? { filters: `type[contains]${type}` } : undefined,
        })

        if (isMounted) {
          setProjects(response.contents)
        }
      } catch {
        if (isMounted) {
          setProjects([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchProjects()

    return () => {
      isMounted = false
    }
  }, [type])

  return { projects, isLoading }
}

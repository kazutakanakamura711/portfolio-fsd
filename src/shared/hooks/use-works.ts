import { useEffect, useState } from 'react'

import type { Works } from '@/entities/microcms/works'
import { client } from '@/shared/api/microcms'

type UseWorksResult = {
  works: Works[]
  isLoading: boolean
}

export const useWorks = (): UseWorksResult => {
  const [works, setWorks] = useState<Works[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchWorks = async () => {
      try {
        const response = await client.getList<Works>({
          endpoint: 'works',
        })

        if (isMounted) {
          setWorks(response.contents)
        }
      } catch {
        if (isMounted) {
          setWorks([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchWorks()

    return () => {
      isMounted = false
    }
  }, [])

  return { works, isLoading }
}

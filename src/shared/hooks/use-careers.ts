import { useEffect, useState } from 'react'

import type { Careers } from '@/entities/microcms/careers'
import { client } from '@/shared/api/microcms'

type UseCareersResult = {
  careers: Careers[]
  isLoading: boolean
}

export const useCareers = (): UseCareersResult => {
  const [careers, setCareers] = useState<Careers[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchCareers = async () => {
      try {
        const response = await client.getList<Careers>({
          endpoint: 'careers',
        })

        if (isMounted) {
          setCareers(response.contents)
        }
      } catch {
        if (isMounted) {
          setCareers([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchCareers()

    return () => {
      isMounted = false
    }
  }, [])

  return { careers, isLoading }
}

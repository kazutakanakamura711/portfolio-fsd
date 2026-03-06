import { useEffect, useState } from 'react'

import type { Applications } from '@/entities/microcms/applications'
import { client } from '@/shared/api/microcms'

type UseApplicationsResult = {
  applications: Applications[]
  isLoading: boolean
}

export const useApplications = (): UseApplicationsResult => {
  const [applications, setApplications] = useState<Applications[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchApplications = async () => {
      try {
        const response = await client.getList<Applications>({
          endpoint: 'applications',
        })

        if (isMounted) {
          setApplications(response.contents)
        }
      } catch {
        if (isMounted) {
          setApplications([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchApplications()

    return () => {
      isMounted = false
    }
  }, [])

  return { applications, isLoading }
}

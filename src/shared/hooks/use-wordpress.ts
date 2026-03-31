import { useEffect, useState } from 'react'

import type { Wordpress } from '@/entities/microcms/wordpress'
import { client } from '@/shared/api/microcms'

type UseWordpressResult = {
  wordpresses: Wordpress[]
  isLoading: boolean
}

export const useWordpress = (): UseWordpressResult => {
  const [wordpresses, setWordpresses] = useState<Wordpress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchWordpresses = async () => {
      try {
        const response = await client.getList<Wordpress>({
          endpoint: 'wordpress',
        })

        if (isMounted) {
          setWordpresses(response.contents)
        }
      } catch {
        if (isMounted) {
          setWordpresses([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchWordpresses()

    return () => {
      isMounted = false
    }
  }, [])

  return { wordpresses, isLoading }
}

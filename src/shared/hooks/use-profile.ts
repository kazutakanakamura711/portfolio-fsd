import { useEffect, useState } from 'react'

import type { Profile } from '@/entities/microcms/profile'
import { client } from '@/shared/api/microcms'

type UseProfileResult = {
  profile: Profile | null
  isLoading: boolean
}

export const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      try {
        const response = await client.getObject<Profile>({
          endpoint: 'profile',
        })

        if (isMounted) {
          setProfile(response)
        }
      } catch {
        if (isMounted) {
          setProfile(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchProfile()

    return () => {
      isMounted = false
    }
  }, [])

  return { profile, isLoading }
}

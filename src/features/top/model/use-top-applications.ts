import { useApplications } from '@/shared/hooks'

export const useTopApplications = () => {
  const { applications, isLoading } = useApplications()

  return { applications, isLoading }
}

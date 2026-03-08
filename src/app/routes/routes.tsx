import { ProfilePage } from '@/pages/profile'
import { PATHS } from './paths'
import { TopPage } from '@/pages/top'
import { ApplicationsPage } from '@/pages/applications'

export const routes = [
  {
    path: PATHS.TOP,
    element: <TopPage />,
  },
  {
    path: PATHS.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: PATHS.APPLICATIONS,
    element: <ApplicationsPage />,
  },
]

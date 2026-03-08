import { ProfilePage } from '@/pages/profile'
import { PATHS } from './paths'
import { TopPage } from '@/pages/top'

export const routes = [
  {
    path: PATHS.TOP,
    element: <TopPage />,
  },
  { path: PATHS.PROFILE, element: <ProfilePage /> },
]

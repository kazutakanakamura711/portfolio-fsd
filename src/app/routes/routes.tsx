import { ProfilePage } from '@/pages/profile'
import { PATHS } from './paths'
import { TopPage } from '@/pages/top'
import { ApplicationsPage } from '@/pages/applications'
import { GalleryPage } from '@/pages/gallery'
import { NotFoundPage } from '@/pages/not-found'

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
  {
    path: PATHS.GALLERY,
    element: <GalleryPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

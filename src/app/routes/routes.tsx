import { ProfilePage } from '@/pages/profile'
import { PATHS } from './paths'
import { TopPage } from '@/pages/top'
import { ApplicationsPage } from '@/pages/applications'
import { WorksPage } from '@/pages/works'
import { GalleryPage } from '@/pages/gallery'
import { NotFoundPage } from '@/pages/not-found'
import { ContactPage } from '@/pages/contact'

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
    path: PATHS.WORKS,
    element: <WorksPage />,
  },
  {
    path: PATHS.GALLERY,
    element: <GalleryPage />,
  },
  {
    path: PATHS.CONTACT,
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

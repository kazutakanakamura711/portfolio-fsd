import { ProfilePage } from '@/pages/profile'
import { PATHS } from './paths'
import { TopPage } from '@/pages/top'
import { ApplicationsPage } from '@/pages/applications'
import { WorksPage } from '@/pages/works'
import { WordpressPage } from '@/pages/wordpress'
import { LpPage } from '@/pages/lp'
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
    path: PATHS.LP,
    element: <LpPage />,
  },
  {
    path: PATHS.WORKS,
    element: <WorksPage />,
  },
  {
    path: PATHS.WORDPRESS,
    element: <WordpressPage />,
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

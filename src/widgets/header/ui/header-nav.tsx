import { NavLink } from 'react-router-dom'
import { PATHS } from '@/app/routes/paths'

const NAV_ITEMS = [
  { label: 'TOP', path: PATHS.TOP },
  { label: 'PROFILE', path: PATHS.PROFILE },
  { label: 'APPLICATIONS', path: PATHS.APPLICATIONS },
  { label: 'GALLERY', path: PATHS.GALLERY },
]

export const HeaderNav = () => {
  return (
    <nav>
      <ul className="flex gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.path} className="group">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-sm font-medium tracking-widest relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-100 after:transition-transform after:duration-300 after:origin-left'
                  : 'text-sm font-medium tracking-widest relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:opacity-50 transition-opacity duration-300'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

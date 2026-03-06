import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { PATHS } from '@/app/routes/paths'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/shadcn/sheet'
import { Button } from '@/shared/ui/shadcn/button'

const NAV_ITEMS = [
  { label: 'TOP', path: PATHS.TOP },
  { label: 'PROFILE', path: PATHS.PROFILE },
  { label: 'APPLICATIONS', path: PATHS.APPLICATIONS },
  { label: 'GALLERY', path: PATHS.GALLERY },
]

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const HeaderHamburger = ({ isOpen, onOpen, onClose }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="メニューを開く">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="px-6 w-3/4"
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8">
          <ul className="flex flex-col gap-6 pl-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lg font-medium tracking-widest underline underline-offset-4'
                      : 'text-lg font-medium tracking-widest hover:opacity-60 transition-opacity'
                  }
                  onClick={onClose}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

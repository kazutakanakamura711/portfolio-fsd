import type { ReactNode } from 'react'
import { Heading, AlignSelf } from './title.types'

const alignSelfMap: Record<AlignSelf, string> = {
  start: 'self-start',
  center: 'self-center',
  end: 'self-end',
}

type Props = {
  children: ReactNode
  as?: Heading
  alignSelf?: AlignSelf
}

export const Title = ({
  children,
  as: Component = Heading.H2,
  alignSelf = AlignSelf.Center,
}: Props) => {
  return (
    <Component
      className={`text-2xl font-medium tracking-super-wide ${alignSelfMap[alignSelf]}`}
    >
      {children}
    </Component>
  )
}

export const Heading = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const

export type Heading = (typeof Heading)[keyof typeof Heading]

export const AlignSelf = {
  Start: 'start',
  Center: 'center',
  End: 'end',
} as const

export type AlignSelf = (typeof AlignSelf)[keyof typeof AlignSelf]

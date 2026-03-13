import { Title, Heading } from '@/shared/ui'
import { GalleryGrid } from './ui'

export const GalleryContainer = () => {
  return (
    <div className="flex flex-col gap-8">
      <Title as={Heading.H1}>GALLERY</Title>
      <GalleryGrid />
    </div>
  )
}

import { useState } from 'react'
import { Dialog, DialogContent } from '@/shared/ui/shadcn/dialog'

import img01 from '@/shared/assets/gallery/img-gallery-01.webp'
import img02 from '@/shared/assets/gallery/img-gallery-02.webp'
import img03 from '@/shared/assets/gallery/img-gallery-03.webp'
import img04 from '@/shared/assets/gallery/img-gallery-04.webp'
import img05 from '@/shared/assets/gallery/img-gallery-05.webp'

const GALLERY_IMAGES = [
  { src: img01, alt: 'gallery-01' },
  { src: img02, alt: 'gallery-02' },
  { src: img03, alt: 'gallery-03' },
  { src: img04, alt: 'gallery-04' },
  { src: img05, alt: 'gallery-05' },
]

type GalleryImage = (typeof GALLERY_IMAGES)[number]

export const GalleryGrid = () => {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GALLERY_IMAGES.map((image) => (
          <button
            key={image.alt}
            type="button"
            onClick={() => setSelected(image)}
            className="overflow-hidden cursor-pointer"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[90vw]! w-fit p-0 overflow-hidden [&>button]:bg-white">
          {selected && (
            <img
              src={selected.src}
              alt={selected.alt}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

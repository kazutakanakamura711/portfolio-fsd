import { useState } from 'react'
import galleryImage from '@/shared/assets/top/img-top-gallery.jpg'
import { Skeleton } from '@/shared/ui'

export const TopGallery = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-medium tracking-super-wide text-center">
        GALLERY
      </h2>

      {/* 画像＋テキスト（左に画像・右にテキスト） */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative w-full md:w-1/2 overflow-hidden">
          {!isImageLoaded && (
            <Skeleton className="w-full aspect-3/2 rounded-none" />
          )}
          <img
            src={galleryImage}
            alt="gallery"
            className={`w-full h-auto object-cover transition-opacity duration-300 ${
              isImageLoaded
                ? 'opacity-100'
                : 'opacity-0 absolute inset-0 h-full'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
        </div>
        <p className="w-full md:w-1/2 text-sm leading-relaxed">
          趣味で制作したPhotoshopの画像作品集です。
          写真のコラージュを中心に制作しています。
        </p>
      </div>
    </section>
  )
}

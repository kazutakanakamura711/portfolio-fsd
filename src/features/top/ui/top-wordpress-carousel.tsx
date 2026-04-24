import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

import type { Wordpress } from '@/entities/microcms/wordpress'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  Skeleton,
} from '@/shared/ui'

type Props = {
  wordpresses: Wordpress[]
}

const splitTechnologies = (technologies: string): string[] => {
  return technologies
    .split(/[、,/|]+/)
    .map((tech) => tech.trim())
    .filter(Boolean)
}

export const TopWordpressCarousel = ({ wordpresses }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageLoaded = (wordpressId: string) => {
    setLoadedImages((previous) => ({ ...previous, [wordpressId]: true }))
  }

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
      setCount(api.scrollSnapList().length)
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || count <= 1) return

    const timer = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
        return
      }

      api.scrollTo(0)
    }, 4000)

    return () => {
      window.clearInterval(timer)
    }
  }, [api, count])

  return (
    <div className="flex flex-col gap-8">
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {wordpresses.map((wordpress) => {
            const techTags = splitTechnologies(wordpress.technologies)

            return (
              <CarouselItem key={wordpress.id}>
                <Card className="mx-4">
                  <CardHeader className="px-6">
                    <div className="relative overflow-hidden rounded-md border aspect-3/2">
                      {!loadedImages[wordpress.id] && (
                        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                      )}
                      <img
                        src={`${wordpress.thumbnail.url}?w=800&q=75&fm=webp`}
                        alt={wordpress.title}
                        className={`h-full w-full object-cover transition-opacity duration-300 ${
                          loadedImages[wordpress.id]
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoaded(wordpress.id)}
                        onError={() => handleImageLoaded(wordpress.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 max-w-sm mx-auto">
                    <CardTitle className="text-lg line-clamp-1">
                      {wordpress.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {wordpress.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techTags.map((tag) => (
                        <span
                          key={`${wordpress.id}-${tag}`}
                          className="inline-flex items-center rounded-full border border-black/15 px-2.5 py-1 text-[11px] tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4 max-w-sm mx-auto">
                    <a
                      href={wordpress.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${wordpress.title} Site`}
                      className="flex items-center gap-1 text-sm hover:opacity-60 transition-opacity"
                    >
                      <ExternalLink size={14} />
                      <span>Site</span>
                    </a>
                  </CardFooter>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 hover:text-[#333333]" />
        <CarouselNext className="right-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 hover:text-[#333333]" />
      </Carousel>

      <div className="flex items-center justify-center gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              current === index ? 'bg-white' : 'bg-white/30'
            }`}
            aria-label={`スライド ${index + 1} へ移動`}
          />
        ))}
      </div>
    </div>
  )
}

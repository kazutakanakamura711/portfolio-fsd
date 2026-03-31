import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

import type { Works } from '@/entities/microcms/works'
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
  works: Works[]
}

const splitTechnologies = (technologies: string): string[] => {
  return technologies
    .split(/[、,/|]+/)
    .map((tech) => tech.trim())
    .filter(Boolean)
}

export const TopWorksCarousel = ({ works }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageLoaded = (workId: string) => {
    setLoadedImages((previous) => ({ ...previous, [workId]: true }))
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
          {works.map((work) => {
            const techTags = splitTechnologies(work.technologies)

            return (
              <CarouselItem key={work.id}>
                <Card className="mx-4">
                  <CardHeader className="px-6">
                    <div className="relative overflow-hidden rounded-md border aspect-3/2">
                      {!loadedImages[work.id] && (
                        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                      )}
                      <img
                        src={`${work.thumbnail.url}?w=800&q=75&fm=webp`}
                        alt={work.title}
                        className={`h-full w-full object-cover transition-opacity duration-300 ${
                          loadedImages[work.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoaded(work.id)}
                        onError={() => handleImageLoaded(work.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 max-w-sm mx-auto">
                    <CardTitle className="text-lg line-clamp-1">
                      {work.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {work.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techTags.map((tag) => (
                        <span
                          key={`${work.id}-${tag}`}
                          className="inline-flex items-center rounded-full border border-black/15 px-2.5 py-1 text-[11px] tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4 max-w-sm mx-auto">
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${work.title} Site`}
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
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="flex items-center justify-center gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={
              index === current
                ? 'h-2 w-2 rounded-full bg-foreground'
                : 'h-2 w-2 rounded-full bg-muted-foreground/40'
            }
          />
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'

import type { Applications } from '@/entities/microcms/applications'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/shared/ui'
import { ExternalLink } from 'lucide-react'

type Props = {
  applications: Applications[]
}

export const TopCarousel = ({ applications }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageLoaded = (applicationId: string) => {
    setLoadedImages((previous) => ({ ...previous, [applicationId]: true }))
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
          {applications.map((application) => (
            <CarouselItem key={application.id}>
              <Card className="mx-4">
                <CardHeader className="px-6">
                  <div className="relative overflow-hidden rounded-md border aspect-3/2">
                    {!loadedImages[application.id] && (
                      <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                    )}
                    <img
                      src={`${application.thumbnail.url}?w=800&q=75&fm=webp`}
                      alt={application.title}
                      className={`h-full w-full object-cover transition-opacity duration-300 ${
                        loadedImages[application.id]
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoaded(application.id)}
                      onError={() => handleImageLoaded(application.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 max-w-sm mx-auto">
                  <CardTitle className="text-lg line-clamp-1">
                    {application.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {application.description}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {application.technologies}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4 max-w-sm mx-auto">
                  <a
                    href={application.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${application.title} App`}
                    className="flex items-center gap-1 text-sm hover:opacity-60 transition-opacity"
                  >
                    <ExternalLink size={14} />
                    <span>App</span>
                  </a>
                  <a
                    href={application.github_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${application.title} GitHub`}
                    className="flex items-center gap-1 text-sm hover:opacity-60 transition-opacity"
                  >
                    <span>GitHub</span>
                  </a>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
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

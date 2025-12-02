"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const thumbnailRef = useRef<HTMLDivElement>(null)

  const transitionToSlide = useCallback(
    (newIndex: number) => {
      if (isTransitioning || newIndex === currentIndex) return

      setIsTransitioning(true)

      // After fade out, change the image
      setTimeout(() => {
        setDisplayIndex(newIndex)
        setCurrentIndex(newIndex)
      }, 150)

      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    },
    [currentIndex, isTransitioning],
  )

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    transitionToSlide(newIndex)
  }, [currentIndex, images.length, transitionToSlide])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    transitionToSlide(newIndex)
  }, [currentIndex, images.length, transitionToSlide])

  const goToSlide = useCallback(
    (index: number) => {
      transitionToSlide(index)
    },
    [transitionToSlide],
  )

  useEffect(() => {
    if (thumbnailRef.current) {
      const container = thumbnailRef.current
      const activeThumb = container.children[currentIndex] as HTMLElement
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2
        container.scrollTo({ left: scrollLeft, behavior: "smooth" })
      }
    }
  }, [currentIndex])

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Main Image */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300 ease-out",
            isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100",
          )}
        >
          <Image
            src={images[displayIndex] || "/placeholder.svg"}
            alt={`Car image ${displayIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Navigation Arrows with hover animation */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 shadow-md rounded-full h-10 w-10 transition-all duration-200"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 shadow-md rounded-full h-10 w-10 transition-all duration-200"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation with smooth scroll */}
      <div className="p-3 border-t border-gray-100">
        <div
          ref={thumbnailRef}
          className="flex gap-2 overflow-x-auto pb-1 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200",
                currentIndex === index
                  ? "border-purple-600 ring-2 ring-purple-200 scale-105"
                  : "border-transparent hover:border-gray-300 hover:scale-105 opacity-70 hover:opacity-100",
              )}
            >
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

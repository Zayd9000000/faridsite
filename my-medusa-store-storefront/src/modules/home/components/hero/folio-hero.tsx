"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const FolioHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      overline: "OVER HALF SOLD",
      title: "The Odyssey & The Iliad",
      subtitle: "Exclusive Edition",
      description: "Experience Homer's timeless epics in our most ambitious edition yet. Hand-bound in Italian leather with gilded pages and original illustrations commissioned exclusively for this collection.",
      cta: "EXPLORE NOW",
      link: "/products/odyssey-iliad-collection",
      image: "/hero-1.jpg" // You'll need to add actual images
    },
    {
      overline: "NEW ARRIVAL",
      title: "One Hundred Years of Solitude",
      subtitle: "50th Anniversary Edition",
      description: "Gabriel García Márquez's masterpiece reimagined with new translations and breathtaking artwork that captures the magical realism of Macondo.",
      cta: "DISCOVER MORE",
      link: "/products/one-hundred-years-solitude",
      image: "/hero-2.jpg"
    },
    {
      overline: "LIMITED RELEASE",
      title: "The Complete Shakespeare",
      subtitle: "Collector's Compendium",
      description: "All 37 plays and 154 sonnets in a stunning seven-volume set. Each volume features period-appropriate typography and illustrations from the Globe Theatre archives.",
      cta: "RESERVE YOURS",
      link: "/products/complete-shakespeare",
      image: "/hero-3.jpg"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] overflow-hidden bg-[#1A1A1A]">
      {/* Background Images with Crossfade */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
          
          {/* Background Image - Using placeholder color for now */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 20s ease-out'
            }}
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-end md:items-center">
        <div className="content-container pb-20 md:pb-0">
          <div className="max-w-xl">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide 
                    ? "opacity-100 transform translate-y-0" 
                    : "opacity-0 transform translate-y-4 absolute"
                }`}
              >
                {index === currentSlide && (
                  <>
                    <p className="overline text-white/90 mb-4">
                      {slide.overline}
                    </p>
                    <h1 className="heading-display text-white mb-3">
                      {slide.title}
                    </h1>
                    <p className="heading-4 text-white/95 font-light mb-6">
                      {slide.subtitle}
                    </p>
                    <p className="body-regular text-white/80 mb-8 max-w-md">
                      {slide.description}
                    </p>
                    <Link 
                      href={slide.link}
                      className="btn-secondary inline-block bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                    >
                      {slide.cta}
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 bg-white" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default FolioHero
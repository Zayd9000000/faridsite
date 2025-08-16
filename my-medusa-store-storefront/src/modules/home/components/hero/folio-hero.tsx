"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FolioHero = () => {
  const heroContent = {
    overline: "OVER HALF SOLD",
    title: "The Odyssey & The Iliad",
    subtitle: "Exclusive Edition",
    description: "Experience Homer's timeless epics in our most ambitious edition yet. Hand-bound in Italian leather with gilded pages and original illustrations commissioned exclusively for this collection.",
    cta: "EXPLORE NOW",
    link: "/products/odyssey-iliad-collection",
    image: "/hero-1.jpg" // You'll need to add actual images
  }

  return (
    <section className="relative h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] overflow-hidden bg-[#1A1A1A]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
        
        {/* Background Image - Using placeholder color for now */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.05)',
            transition: 'transform 20s ease-out'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center">
        <div className="content-container pt-16 md:pt-20">
          <div className="max-w-2xl">
            <p className="font-serif text-[16px] leading-[20px] text-white/90 font-normal mb-2 tracking-[0.5px]">
              {heroContent.subtitle}
            </p>
            <h1 className="font-serif text-[56px] leading-[58px] font-medium text-white mb-3">
              {heroContent.title}
            </h1>
            <p className="text-[15px] leading-[24px] text-white/90 mb-6 max-w-lg font-normal">
              {heroContent.description}
            </p>
            <LocalizedClientLink 
              href={heroContent.link}
              className="inline-block bg-white text-[#1A1A1A] px-8 py-3 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300"
            >
              {heroContent.cta}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FolioHero
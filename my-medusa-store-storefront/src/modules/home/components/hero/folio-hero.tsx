"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FolioHero = () => {
  const heroContent = {
    overline: "",
    title: "Sparrow Hall",
    subtitle: "A sanctuary for the mind",
    description: "Hidden in a quiet corner of the countryside, within the beams of a sixteenth-century hall, Sparrow Hall is more than a bookshop: it is a retreat for those who recognise that to read deeply is to dwell with a question, to return and return until its meaning ripens.",
    cta: "EXPLORE NOW",
    link: "/store",
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
            backgroundImage: `url('/images/site/opencottage.png')`,
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
          <div>
            <h1 className="font-serif text-[68px] leading-[70px] font-light text-white mb-3">
              {heroContent.title}
            </h1>
            <p className="text-[15px] leading-[24px] text-white/85 mb-5 max-w-xl font-normal">
              {heroContent.description}
            </p>
            <LocalizedClientLink 
              href={heroContent.link}
              className="inline-block bg-white text-[#1A1A1A] px-12 py-3.5 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300"
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
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SpotlightSection = () => {
  return (
    <>
      {/* First Encounter - A Dialogue with Bulgakov */}
      <section className="feature-grid">
        <div className="bg-[#F8F8F8] flex items-center justify-center p-24">
          <div className="max-w-lg">
            <h2 className="font-serif text-[32px] leading-[40px] font-light mb-6">
              <em>The Master and Margarita</em>: A manuscript that waited in darkness
            </h2>
            <p className="text-[16px] leading-[26px] text-[#444] mb-8 font-light">
              For decades, Bulgakov's testament lay hidden—a work too dangerous for its time, 
              too honest for its place. Here is a book that teaches patience: written in secret, 
              published posthumously, it arrives to each reader when the moment is right. 
              Not a novel to be consumed, but a labyrinth to inhabit.
            </p>
            <LocalizedClientLink href="/products/master-margarita" className="inline-block text-[#1A1A1A] text-[13px] tracking-[2px] uppercase font-light border-b border-[#1A1A1A]/40 hover:border-[#1A1A1A] transition-all duration-500">
              ENCOUNTER THIS WORK
            </LocalizedClientLink>
          </div>
        </div>
        <div className="relative h-[560px] bg-gray-200 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-[1.2]"
            style={{
              backgroundImage: `url('/images/site/master-margarita.jpeg')`,
            }}
          />
        </div>
      </section>

      {/* Books That Wait */}
      <section className="bg-[#F0EDE8]">
        <div className="content-container py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-serif text-[38px] leading-[46px] font-light mb-6">Books that are still becoming</h2>
              <p className="text-[16px] leading-[26px] text-[#444] mb-8 font-light">
                Some texts arrive before their time; others wait centuries to find their readers. 
                These forthcoming volumes have chosen their moment—will you be there to meet them?
              </p>
              <LocalizedClientLink href="/store?filter=coming-soon" className="inline-block text-[#1A1A1A] text-[13px] tracking-[2px] uppercase font-light border-b border-[#1A1A1A]/40 hover:border-[#1A1A1A] transition-all duration-500">
                VIEW ARRIVALS
              </LocalizedClientLink>
              
              <div className="mt-12 space-y-4">
                <div className="border-b border-[#D5D5D5]/50 pb-4">
                  <p className="text-[11px] text-[#666] mb-2 font-light uppercase tracking-[1.5px]">Autumn Equinox</p>
                  <p className="font-serif text-[17px] leading-[24px] font-light">Austen's <em>Pride and Prejudice</em>: A study in social architecture</p>
                </div>
                <div className="border-b border-[#D5D5D5]/50 pb-4">
                  <p className="text-[11px] text-[#666] mb-2 font-light uppercase tracking-[1.5px]">When the desert blooms</p>
                  <p className="font-serif text-[17px] leading-[24px] font-light">Herbert's <em>Dune</em>: Ecology as metaphysics</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] overflow-hidden">
              <div 
                className="absolute inset-0 transform -rotate-6 shadow-2xl scale-[1.35]"
                style={{
                  backgroundImage: `url('/images/site/books-becoming.jpeg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The House */}
      <section id="the-house" className="bg-white">
        <div className="content-container py-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-[38px] leading-[46px] font-light mb-6">The House That Holds</h2>
            <p className="text-[16px] leading-[26px] text-[#666] max-w-2xl mx-auto font-light">
              Since the sixteenth century, these beams have witnessed readers and their questions. 
              The walls remember every conversation between mind and page—each book waiting for 
              the reader who will understand its particular silence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-64 mb-8 relative overflow-hidden bg-[#F5F5F5]">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/site/antique-library.jpg')`,
                    filter: 'brightness(0.85) contrast(1.1) sepia(0.2)'
                  }}
                />
              </div>
              <h3 className="font-serif text-[19px] leading-[26px] font-light mb-4">Metaphysics & Mind</h3>
              <p className="text-[14px] leading-[22px] text-[#666] font-light">
                Where thought turns inward to examine its own architecture—from 
                Spinoza's geometry of ethics to contemporary phenomenology.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-64 mb-8 relative overflow-hidden bg-[#F5F5F5]">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/site/sacred-geometry.jpg')`,
                    filter: 'brightness(0.75) contrast(1.2) sepia(0.15)'
                  }}
                />
              </div>
              <h3 className="font-serif text-[19px] leading-[26px] font-light mb-4">Symbol & Divination</h3>
              <p className="text-[14px] leading-[22px] text-[#666] font-light">
                The ancient arts of reading signs—I Ching, Tarot, sacred geometry—texts 
                that teach us to perceive the patterns beneath appearance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-64 mb-8 relative overflow-hidden bg-[#F5F5F5]">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/site/illuminated-manuscript.jpg')`,
                    filter: 'brightness(0.9) contrast(1.1) sepia(0.1)'
                  }}
                />
              </div>
              <h3 className="font-serif text-[19px] leading-[26px] font-light mb-4">Art & Aesthetics</h3>
              <p className="text-[14px] leading-[22px] text-[#666] font-light">
                Beauty as a form of knowledge—from Renaissance treatises on proportion 
                to meditations on the nature of artistic truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Invitation */}
      <section className="bg-white border-t border-[#E5E5E5]">
        <div className="content-container py-24">
          <p className="font-serif text-[24px] leading-[36px] font-light text-center max-w-3xl mx-auto">
            Sparrow Hall is less a marketplace than an invitation: to walk slowly, 
            to encounter the rare, and to rediscover the art of pondering.
          </p>
        </div>
      </section>
    </>
  )
}

export default SpotlightSection
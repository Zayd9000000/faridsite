import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SpotlightSection = () => {
  return (
    <>
      {/* First Spotlight - Anniversary Edition */}
      <section className="feature-grid">
        <div className="bg-[#F8F8F8] flex items-center justify-center p-24">
          <div className="max-w-lg">
            <h2 className="font-serif text-[36px] leading-[40px] font-medium mb-2">
              Celebrate Fifty Years of Literary Excellence
            </h2>
            <h3 className="font-serif text-[20px] leading-[24px] font-normal mb-4">
              with <em className="font-serif">The Master and Margarita</em>
            </h3>
            <p className="text-[15px] leading-[22px] text-[#444] mb-6 font-normal">
              Before the acclaim, before becoming a cornerstone of Russian literature, 
              there was the manuscript: a satirical masterpiece that challenged the very 
              fabric of Soviet society. Our edition of Bulgakov's magnum opus brings this 
              subversive story to life with haunting illustrations and meticulous design 
              that captures both its dark humor and profound humanity.
            </p>
            <LocalizedClientLink href="/products/master-margarita" className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#333] transition-colors">
              EXPLORE EDITION
            </LocalizedClientLink>
          </div>
        </div>
        <div className="relative h-[560px] bg-gray-200 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800')`,
            }}
          />
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-[#F0EDE8]">
        <div className="content-container py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-serif text-[42px] leading-[46px] font-medium mb-3">Forthcoming Treasures</h2>
              <p className="text-[15px] leading-[22px] text-[#444] mb-6 font-normal">
                The finest editions take time to perfect. Sign up to be among the first 
                to discover our upcoming releases and reserve your copy before they disappear.
              </p>
              <LocalizedClientLink href="/store?filter=coming-soon" className="inline-block border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#1A1A1A] hover:text-white transition-all">
                VIEW ALL RELEASES
              </LocalizedClientLink>
              
              <div className="mt-10 space-y-3">
                <div className="border-b border-[#D5D5D5] pb-3">
                  <p className="text-[12px] text-[#666] mb-1 font-medium uppercase tracking-[1px]">15 September</p>
                  <p className="font-serif text-[18px] leading-[22px] font-medium">Pride and Prejudice: The Bicentennial Edition</p>
                </div>
                <div className="border-b border-[#D5D5D5] pb-3">
                  <p className="text-[12px] text-[#666] mb-1 font-medium uppercase tracking-[1px]">October</p>
                  <p className="font-serif text-[18px] leading-[22px] font-medium">Dune: The Desert Planet Archives</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px]">
              <div 
                className="absolute inset-0 transform -rotate-6 shadow-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="bg-white">
        <div className="content-container py-32">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[42px] leading-[46px] font-medium mb-3">Behind the Binding</h2>
            <p className="text-[15px] leading-[22px] text-[#666] max-w-2xl mx-auto font-normal">
              Every edition we create is a labor of love, combining traditional craftsmanship 
              with contemporary design to produce books that are as beautiful as they are enduring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-64 bg-[#F5F5F5] mb-6"></div>
              <h3 className="font-serif text-[20px] leading-[24px] font-medium mb-2">Editorial Excellence</h3>
              <p className="text-[14px] leading-[20px] text-[#666] font-normal">
                Our editors work with leading scholars to ensure every text is authoritative 
                and every translation captures the author's true voice.
              </p>
              <LocalizedClientLink href="/about#editorial" className="text-[13px] underline mt-3 inline-block font-normal">
                Learn More
              </LocalizedClientLink>
            </div>
            
            <div className="text-center">
              <div className="h-64 bg-[#F5F5F5] mb-6"></div>
              <h3 className="font-serif text-[20px] leading-[24px] font-medium mb-2">Artistic Vision</h3>
              <p className="text-[14px] leading-[20px] text-[#666] font-normal">
                We commission original artwork from acclaimed illustrators who bring 
                fresh perspectives to classic texts.
              </p>
              <LocalizedClientLink href="/about#art" className="text-[13px] underline mt-3 inline-block font-normal">
                Discover Artists
              </LocalizedClientLink>
            </div>
            
            <div className="text-center">
              <div className="h-64 bg-[#F5F5F5] mb-6"></div>
              <h3 className="font-serif text-[20px] leading-[24px] font-medium mb-2">Master Craftsmanship</h3>
              <p className="text-[14px] leading-[20px] text-[#666] font-normal">
                Each book is bound by hand using time-honored techniques and the 
                finest materials sourced from around the world.
              </p>
              <LocalizedClientLink href="/about#craft" className="text-[13px] underline mt-3 inline-block font-normal">
                See Process
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white border-t border-[#E5E5E5]">
        <div className="content-container py-24">
          <h2 className="font-serif text-[72px] leading-[76px] font-medium text-center mb-12">Love Books, Love Life</h2>
        </div>
      </section>
    </>
  )
}

export default SpotlightSection
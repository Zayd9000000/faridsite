import Link from "next/link"

const SpotlightSection = () => {
  return (
    <>
      {/* First Spotlight - Anniversary Edition */}
      <section className="feature-grid">
        <div className="bg-[#F8F8F8] flex items-center justify-center p-20">
          <div className="max-w-md">
            <p className="overline text-[#999] mb-6">IN THE SPOTLIGHT</p>
            <h2 className="heading-2 mb-6">
              Celebrate Fifty Years of Literary Excellence
            </h2>
            <h3 className="heading-4 font-light mb-6">
              with <em className="font-serif">The Master and Margarita</em>
            </h3>
            <p className="body-regular text-[#444] mb-8">
              Before the acclaim, before becoming a cornerstone of Russian literature, 
              there was the manuscript: a satirical masterpiece that challenged the very 
              fabric of Soviet society. Our edition of Bulgakov's magnum opus brings this 
              subversive story to life with haunting illustrations and meticulous design 
              that captures both its dark humor and profound humanity.
            </p>
            <Link href="/products/master-margarita" className="btn-primary inline-block">
              EXPLORE EDITION
            </Link>
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
        <div className="content-container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="overline text-[#999] mb-6">COMING SOON</p>
              <h2 className="heading-1 mb-6">Forthcoming Treasures</h2>
              <p className="body-large text-[#444] mb-8">
                The finest editions take time to perfect. Sign up to be among the first 
                to discover our upcoming releases and reserve your copy before they disappear.
              </p>
              <Link href="/store?filter=coming-soon" className="btn-secondary inline-block">
                VIEW ALL RELEASES
              </Link>
              
              <div className="mt-12 space-y-4">
                <div className="border-b border-[#D5D5D5] pb-4">
                  <p className="text-sm text-[#999] mb-1">15 September</p>
                  <p className="font-serif text-lg">Pride and Prejudice: The Bicentennial Edition</p>
                </div>
                <div className="border-b border-[#D5D5D5] pb-4">
                  <p className="text-sm text-[#999] mb-1">October</p>
                  <p className="font-serif text-lg">Dune: The Desert Planet Archives</p>
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
        <div className="content-container py-24">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Behind the Binding</h2>
            <p className="body-large text-[#666] max-w-2xl mx-auto">
              Every edition we create is a labor of love, combining traditional craftsmanship 
              with contemporary design to produce books that are as beautiful as they are enduring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-64 bg-[#F5F5F5] mb-6"></div>
              <h3 className="font-serif text-xl mb-3">Editorial Excellence</h3>
              <p className="body-small text-[#666]">
                Our editors work with leading scholars to ensure every text is authoritative 
                and every translation captures the author's true voice.
              </p>
              <Link href="/about#editorial" className="text-sm underline mt-4 inline-block">
                Learn More
              </Link>
            </div>
            
            <div className="text-center">
              <div className="h-64 bg-[#F5F5F5] mb-6"></div>
              <h3 className="font-serif text-xl mb-3">Artistic Vision</h3>
              <p className="body-small text-[#666]">
                We commission original artwork from acclaimed illustrators who bring 
                fresh perspectives to classic texts.
              </p>
              <Link href="/about#art" className="text-sm underline mt-4 inline-block">
                Discover Artists
              </Link>
            </div>
            
            <div className="text-center">
              <div className="h-64 bg-[#F5F5F5] mb-6"></div>
              <h3 className="font-serif text-xl mb-3">Master Craftsmanship</h3>
              <p className="body-small text-[#666]">
                Each book is bound by hand using time-honored techniques and the 
                finest materials sourced from around the world.
              </p>
              <Link href="/about#craft" className="text-sm underline mt-4 inline-block">
                See Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white border-t border-[#E5E5E5]">
        <div className="content-container py-20">
          <h2 className="heading-2 text-center mb-12">Love Books, Love Life</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400')`
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    @booklovers_{i}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default SpotlightSection
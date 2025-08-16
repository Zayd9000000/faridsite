"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface FolioCarouselProps {
  products: any[]
  title?: string
  subtitle?: string
}

const FolioCarousel = ({ products = [], title, subtitle }: FolioCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const { countryCode } = useParams() as { countryCode: string }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280 // Width of one card plus gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get the first available variant (or default variant)
    const variant = product.variants?.[0]
    
    if (!variant?.id) {
      console.error('No variant available for product:', product.id)
      return
    }
    
    setAddingToCart(product.id)
    
    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode: countryCode
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setAddingToCart(null)
    }
  }

  // Use actual products if available, otherwise show mock data
  const displayProducts = products.length > 0 ? products : [
    {
      id: "1",
      title: "The Divine Comedy",
      handle: "divine-comedy",
      author: "Dante Alighieri",
      price: "£125",
      badge: "SELLING FAST",
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      images: [{ url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" }]
    },
    {
      id: "2",
      title: "War and Peace",
      handle: "war-and-peace",
      author: "Leo Tolstoy",
      price: "£95",
      badge: null,
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      images: [{ url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" }]
    },
    {
      id: "3",
      title: "Ulysses",
      handle: "ulysses",
      author: "James Joyce",
      price: "£110",
      badge: "LIMITED STOCK",
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      images: [{ url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" }]
    },
    {
      id: "4",
      title: "Don Quixote",
      handle: "don-quixote",
      author: "Miguel de Cervantes",
      price: "£85",
      badge: null,
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      images: [{ url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" }]
    },
    {
      id: "5",
      title: "Moby Dick",
      handle: "moby-dick",
      author: "Herman Melville",
      price: "£75",
      badge: "NEW ARRIVAL",
      thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      images: [{ url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" }]
    },
    {
      id: "6",
      title: "Pride and Prejudice",
      handle: "pride-prejudice",
      author: "Jane Austen",
      price: "£65",
      badge: null,
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      images: [{ url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" }]
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-[42px] leading-[46px] font-medium mb-3">
            {title || "What Everyone's Reading Right Now"}
          </h2>
          <p className="text-[15px] leading-[22px] font-normal text-[#666]">
            {subtitle || "Our most sought-after editions. These are the treasures that collectors return to time and again."}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Products Scroll Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {displayProducts.map((product) => {
              // Get product image URL (handle both mock and real product structure)
              const imageUrl = product.thumbnail || 
                              product.images?.[0]?.url || 
                              'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
              
              // Get secondary image (if available)
              const secondaryImageUrl = product.images?.[1]?.url || imageUrl
              
              // Get price from calculated price or use mock price
              const price = product.variants?.[0]?.calculated_price?.calculated_amount 
                ? `£${(product.variants[0].calculated_price.calculated_amount / 100).toFixed(0)}`
                : product.price || '£0'
              
              // Get author from metadata or use placeholder
              const author = product.metadata?.author || product.author || 'Classic Edition'
              
              return (
                <LocalizedClientLink
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group flex-none w-[260px] cursor-pointer"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Product Card */}
                  <div className="relative">
                    {/* Badge */}
                    {product.badge && (
                      <span className="product-badge">
                        {product.badge}
                      </span>
                    )}

                    {/* Image Container with Hover Effect */}
                    <div className="product-card-image relative overflow-hidden bg-[#F5F5F5]">
                      {/* Primary Image */}
                      <div 
                        className="absolute inset-0 transition-transform duration-400 group-hover:-translate-x-full"
                        style={{
                          backgroundImage: `url('${imageUrl}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      
                      {/* Secondary Image (reveals on hover) */}
                      <div 
                        className="absolute inset-0 transition-transform duration-400 translate-x-full group-hover:translate-x-0"
                        style={{
                          backgroundImage: `url('${secondaryImageUrl}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />

                      {/* Add to Bag Button */}
                      <button 
                        className="absolute bottom-0 left-0 right-0 h-12 bg-[#1A1A1A] text-white text-xs tracking-wider uppercase transform translate-y-full transition-transform duration-300 delay-100 group-hover:translate-y-0 disabled:opacity-50"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={addingToCart === product.id}
                      >
                        {addingToCart === product.id ? 'ADDING...' : '+ ADD TO BAG'}
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="pt-3">
                      <p className="text-[12px] text-[#666] mb-1 font-medium tracking-[1px] uppercase">{author}</p>
                      <h3 className="font-serif text-[18px] leading-[22px] font-medium mb-1 group-hover:underline">
                        {product.title}
                      </h3>
                      <p className="text-[14px] font-semibold">{price}</p>
                    </div>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FolioCarousel
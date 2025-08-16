"use client"

import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React, { useState } from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type AnimatedThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  showAddToCart?: boolean
  onAddToCart?: (e: React.MouseEvent) => void
  isAddingToCart?: boolean
  "data-testid"?: string
}

const AnimatedThumbnail: React.FC<AnimatedThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  showAddToCart = false,
  onAddToCart,
  isAddingToCart = false,
  "data-testid": dataTestid,
}) => {
  const primaryImage = thumbnail || images?.[0]?.url
  const secondaryImage = images?.[1]?.url || primaryImage

  return (
    <Container
      className={clx(
        "group relative w-full overflow-hidden bg-[#F5F5F5] transition-all duration-200",
        className,
        {
          "aspect-[2/3]": isFeatured,
          "aspect-[2/3]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      {/* Primary Image */}
      {primaryImage && (
        <div 
          className="absolute inset-0 transition-transform duration-[400ms] ease-out group-hover:-translate-x-full"
          style={{
            backgroundImage: `url('${primaryImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      {/* Secondary Image (reveals on hover) */}
      {secondaryImage && (
        <div 
          className="absolute inset-0 transition-transform duration-[400ms] ease-out translate-x-full group-hover:translate-x-0"
          style={{
            backgroundImage: `url('${secondaryImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Placeholder if no images */}
      {!primaryImage && (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          <PlaceholderImage size={size === "small" ? 16 : 24} />
        </div>
      )}

      {/* Add to Bag Button */}
      {showAddToCart && onAddToCart && (
        <button 
          className="absolute bottom-0 left-0 right-0 h-12 bg-[#1A1A1A] text-white text-xs tracking-wider uppercase transform translate-y-full transition-transform duration-300 delay-100 group-hover:translate-y-0 disabled:opacity-50 hover:bg-black"
          onClick={onAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? 'ADDING...' : '+ ADD TO BAG'}
        </button>
      )}
    </Container>
  )
}

export default AnimatedThumbnail
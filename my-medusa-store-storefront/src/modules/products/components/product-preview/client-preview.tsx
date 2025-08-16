"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AnimatedThumbnail from "../thumbnail/animated-thumbnail"
import PreviewPrice from "./price"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"

type ClientProductPreviewProps = {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  cheapestPrice?: {
    calculated_price_number: number
    calculated_price: string
    original_price_number: number
    original_price: string
    currency_code: string
    price_type: string
    percentage_diff: number
  } | null
}

export default function ClientProductPreview({
  product,
  isFeatured,
  region,
  cheapestPrice,
}: ClientProductPreviewProps) {
  const [addingToCart, setAddingToCart] = useState(false)
  const { countryCode } = useParams() as { countryCode: string }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const variant = product.variants?.[0]
    
    if (!variant?.id) {
      console.error('No variant available for product:', product.id)
      return
    }
    
    setAddingToCart(true)
    
    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode: countryCode
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper" className="relative">
        <AnimatedThumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          showAddToCart={true}
          onAddToCart={handleAddToCart}
          isAddingToCart={addingToCart}
        />
        <div className="mt-2 font-serif">
          <h3 className="font-serif text-[18px] leading-[22px] text-[#1A1A1A] line-clamp-1 font-medium group-hover:underline" data-testid="product-title">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="font-sans text-[12px] text-[#666] mt-0.5 mb-1 line-clamp-1 tracking-wide font-normal">
              {product.subtitle}
            </p>
          )}
          <div className="flex items-center gap-x-2 mt-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
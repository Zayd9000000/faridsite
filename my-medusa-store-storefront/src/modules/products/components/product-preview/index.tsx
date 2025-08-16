import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import ClientProductPreview from "./client-preview"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <ClientProductPreview
      product={product}
      isFeatured={isFeatured}
      region={region}
      cheapestPrice={cheapestPrice}
    />
  )
}

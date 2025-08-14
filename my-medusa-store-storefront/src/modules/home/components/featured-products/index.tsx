import { HttpTypes } from "@medusajs/types"
import FolioCarousel from "./folio-carousel"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { listProducts } from "@lib/data/products"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  console.log("🔍 FeaturedProducts - Region:", region?.id, region?.name)
  
  // Fetch all products to display in the carousel (not filtered by collection)
  let carouselProducts = []
  try {
    console.log("🔍 Fetching products for region:", region.id)
    const {
      response: { products },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        fields: "*variants.calculated_price",
        limit: 12,
      },
    })
    carouselProducts = products || []
    console.log("🔍 Fetched products count:", carouselProducts.length)
  } catch (error) {
    console.error("❌ Error fetching products:", error)
  }

  return (
    <>
      <FolioCarousel 
        products={carouselProducts} 
        title="Curated Treasures"
        subtitle="Discover our hand-selected editions, each one a masterpiece of literary craft and artistic vision."
      />
      {collections.map((collection) => (
        <li key={collection.id} className="list-none">
          <ProductRail collection={collection} region={region} />
        </li>
      ))}
    </>
  )
}

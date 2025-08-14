import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import SpotlightSection from "@modules/home/components/spotlight"
import { listCollections } from "@lib/data/collections"

export const metadata: Metadata = {
  title: "The Literary Collection - Beautifully Crafted Editions",
  description:
    "Discover our exquisite collection of hand-bound literary masterpieces. Each edition combines scholarly excellence with artisanal craftsmanship.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  // Skip country code mapping entirely - use hardcoded Europe region
  const region = {
    id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
    name: "Europe",
    currency_code: "gbp",
    countries: []
  } as any

  console.log("🚀 Using hardcoded region for testing:", region.id)

  // Get collections data
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <>
      <Hero />
      <FeaturedProducts region={region} collections={collections} />
      <SpotlightSection />
    </>
  )
}

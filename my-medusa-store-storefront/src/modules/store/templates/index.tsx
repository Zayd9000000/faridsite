import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="w-full">
      {/* Hero Title Section */}
      <div className="w-full py-16 border-b border-[#E5E5E5] bg-gradient-to-b from-[#FAFAFA] to-white">
        <div className="content-container text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] mb-4 font-light">
            The Collection
          </h1>
          <p className="text-lg text-[#666] max-w-2xl mx-auto font-light leading-relaxed">
            Each book arrives as a question, selected not to be consumed but contemplated—volumes that reward the patience of slow reading
          </p>
        </div>
      </div>

      {/* Store Content */}
      <div
        className="flex flex-col small:flex-row small:items-start py-8 content-container small:gap-12"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate

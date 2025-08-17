"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { ChevronDown } from "lucide-react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [expandedSections, setExpandedSections] = useState<string[]>(["sort", "category", "collection"])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const categories = [
    "Recent Arrivals",
    "Metaphysics",
    "Divination",
    "Art & Aesthetics",
    "Theology",
    "Poetry"
  ]

  const collections = [
    "Ontology & Being",
    "Epistemology",
    "Philosophy of Mind",
    "Eastern Philosophy",
    "Phenomenology",
    "Ethics & Morality",
    "I Ching",
    "Tarot & Oracle",
    "Astrology",
    "Sacred Geometry",
    "Renaissance Treatises",
    "Color Theory",
    "Sacred Art",
    "Architecture"
  ]

  return (
    <div className="flex small:flex-col gap-6 py-4 mb-8 small:px-0 pl-6 small:min-w-[280px] small:mr-8">
      {/* Sort Section */}
      <div className="border-b border-[#E5E5E5] pb-6">
        <button
          onClick={() => toggleSection("sort")}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-sm font-medium uppercase tracking-wider text-[#1A1A1A]">Sort By</h3>
          <ChevronDown 
            size={16} 
            className={`transition-transform ${expandedSections.includes("sort") ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.includes("sort") && (
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
        )}
      </div>

      {/* Categories Section */}
      <div className="border-b border-[#E5E5E5] pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-sm font-medium uppercase tracking-wider text-[#1A1A1A]">Categories</h3>
          <ChevronDown 
            size={16} 
            className={`transition-transform ${expandedSections.includes("category") ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.includes("category") && (
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                className="block w-full text-left text-sm text-[#666] hover:text-[#1A1A1A] transition-colors"
                onClick={() => console.log(`Filter by ${category}`)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Collections Section */}
      <div className="border-b border-[#E5E5E5] pb-6">
        <button
          onClick={() => toggleSection("collection")}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-sm font-medium uppercase tracking-wider text-[#1A1A1A]">Collections</h3>
          <ChevronDown 
            size={16} 
            className={`transition-transform ${expandedSections.includes("collection") ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.includes("collection") && (
          <div className="space-y-3">
            {collections.map((collection) => (
              <button
                key={collection}
                className="block w-full text-left text-sm text-[#666] hover:text-[#1A1A1A] transition-colors"
                onClick={() => console.log(`Filter by ${collection}`)}
              >
                {collection}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RefinementList

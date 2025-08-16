"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = (_pageParam === 1) ? 0 : (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  try {
    return await sdk.client
      .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
        `/store/products`,
        {
          method: "GET",
          query: {
            limit,
            offset,
            region_id: region?.id,
            fields:
              "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
            ...queryParams,
          },
          headers,
          next,
          cache: "force-cache",
        }
      )
      .then(({ products, count }) => {
        const nextPage = count > offset + limit ? pageParam + 1 : null

        return {
          response: {
            products,
            count,
          },
          nextPage: nextPage,
          queryParams,
        }
      })
  } catch (error) {
    console.log("[listProducts] API failed, returning mock products for development")
    
    // Mock products for development when API is not available
    const mockProducts: HttpTypes.StoreProduct[] = [
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V2",
        title: "The Odyssey & The Iliad",
        subtitle: "Homer's Epic Collection",
        description: "Experience Homer's timeless epics in our most ambitious edition yet. Hand-bound in Italian leather with gilded pages and original illustrations.",
        handle: "odyssey-iliad-collection",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
        weight: 2000,
        length: null,
        height: null,
        width: null,
        hs_code: null,
        origin_country: "UK",
        mid_code: null,
        material: "Leather",
        collection_id: null,
        type_id: null,
        discountable: true,
        external_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
        variants: [
          {
            id: "variant_01HFGYQM87RC02GQGX47GZS9V3",
            title: "Standard Edition",
            sku: "ODYSSEY-STD-001",
            barcode: null,
            ean: null,
            upc: null,
            variant_rank: 0,
            inventory_quantity: 10,
            allow_backorder: false,
            manage_inventory: true,
            hs_code: null,
            origin_country: "UK",
            mid_code: null,
            material: "Leather",
            weight: 2000,
            length: null,
            height: null,
            width: null,
            metadata: null,
            product_id: "prod_01HFGYQM87RC02GQGX47GZS9V2",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
            calculated_price: {
              id: "calc_01HFGYQM87RC02GQGX47GZS9V4",
              is_calculated_price_price_list: false,
              is_calculated_price_tax_inclusive: false,
              calculated_amount: 12500,
              is_original_price_price_list: false,
              is_original_price_tax_inclusive: false,
              original_amount: 12500,
              currency_code: "gbp",
              calculated_price: {
                id: "price_01HFGYQM87RC02GQGX47GZS9V5",
                currency_code: "gbp",
                amount: 12500,
                min_quantity: null,
                max_quantity: null,
                price_list_id: null,
                price_list_type: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null
              },
              original_price: {
                id: "price_01HFGYQM87RC02GQGX47GZS9V5",
                currency_code: "gbp",
                amount: 12500,
                min_quantity: null,
                max_quantity: null,
                price_list_id: null,
                price_list_type: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null
              }
            }
          }
        ],
        options: [],
        images: [
          {
            id: "img_01HFGYQM87RC02GQGX47GZS9V6",
            url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
            metadata: null
          }
        ],
        tags: [],
        categories: []
      },
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V7",
        title: "The Master and Margarita",
        subtitle: "Bulgakov's Masterpiece",
        description: "A satirical masterpiece that challenged Soviet society. Our edition brings this subversive story to life with haunting illustrations.",
        handle: "master-margarita",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600",
        weight: 1500,
        length: null,
        height: null,
        width: null,
        hs_code: null,
        origin_country: "UK",
        mid_code: null,
        material: "Leather",
        collection_id: null,
        type_id: null,
        discountable: true,
        external_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
        variants: [
          {
            id: "variant_01HFGYQM87RC02GQGX47GZS9V8",
            title: "Limited Edition",
            sku: "MASTER-LTD-001",
            barcode: null,
            ean: null,
            upc: null,
            variant_rank: 0,
            inventory_quantity: 5,
            allow_backorder: false,
            manage_inventory: true,
            hs_code: null,
            origin_country: "UK",
            mid_code: null,
            material: "Leather",
            weight: 1500,
            length: null,
            height: null,
            width: null,
            metadata: null,
            product_id: "prod_01HFGYQM87RC02GQGX47GZS9V7",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
            calculated_price: {
              id: "calc_01HFGYQM87RC02GQGX47GZS9V9",
              is_calculated_price_price_list: false,
              is_calculated_price_tax_inclusive: false,
              calculated_amount: 8500,
              is_original_price_price_list: false,
              is_original_price_tax_inclusive: false,
              original_amount: 8500,
              currency_code: "gbp",
              calculated_price: {
                id: "price_01HFGYQM87RC02GQGX47GZS9V10",
                currency_code: "gbp",
                amount: 8500,
                min_quantity: null,
                max_quantity: null,
                price_list_id: null,
                price_list_type: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null
              },
              original_price: {
                id: "price_01HFGYQM87RC02GQGX47GZS9V10",
                currency_code: "gbp",
                amount: 8500,
                min_quantity: null,
                max_quantity: null,
                price_list_id: null,
                price_list_type: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null
              }
            }
          }
        ],
        options: [],
        images: [
          {
            id: "img_01HFGYQM87RC02GQGX47GZS9V11",
            url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
            metadata: null
          }
        ],
        tags: [],
        categories: []
      },
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V12",
        title: "One Hundred Years of Solitude",
        subtitle: "García Márquez's Magical Realism",
        description: "Gabriel García Márquez's masterpiece reimagined with new translations and breathtaking artwork.",
        handle: "one-hundred-years-solitude",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        weight: 1800,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V13",
          title: "50th Anniversary Edition",
          sku: "SOLITUDE-50TH-001",
          inventory_quantity: 8,
          calculated_price: {
            calculated_amount: 9500,
            original_amount: 9500,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V14",
        title: "The Complete Shakespeare",
        subtitle: "Collector's Compendium",
        description: "All 37 plays and 154 sonnets in a stunning seven-volume set.",
        handle: "complete-shakespeare",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600",
        weight: 5000,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V15",
          title: "Seven Volume Set",
          sku: "SHAKESPEARE-COMPLETE-001",
          inventory_quantity: 3,
          calculated_price: {
            calculated_amount: 35000,
            original_amount: 35000,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V16",
        title: "Pride and Prejudice",
        subtitle: "The Bicentennial Edition",
        description: "Jane Austen's beloved novel in a deluxe edition with period-appropriate illustrations.",
        handle: "pride-prejudice-bicentennial",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        weight: 1200,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V17",
          title: "Deluxe Edition",
          sku: "AUSTEN-PP-001",
          inventory_quantity: 12,
          calculated_price: {
            calculated_amount: 6500,
            original_amount: 6500,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V18",
        title: "The Divine Comedy",
        subtitle: "Dante's Complete Journey",
        description: "Dante Alighieri's epic poem with Gustav Doré's iconic illustrations.",
        handle: "divine-comedy-dore",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        weight: 2200,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V19",
          title: "Illustrated Edition",
          sku: "DANTE-DC-001",
          inventory_quantity: 7,
          calculated_price: {
            calculated_amount: 12500,
            original_amount: 12500,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V20",
        title: "War and Peace",
        subtitle: "Tolstoy's Epic",
        description: "The definitive edition of Tolstoy's masterwork with new translations and annotations.",
        handle: "war-peace-definitive",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
        weight: 2800,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V21",
          title: "Two Volume Set",
          sku: "TOLSTOY-WP-001",
          inventory_quantity: 6,
          calculated_price: {
            calculated_amount: 15000,
            original_amount: 15000,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V22",
        title: "Dune: The Desert Planet Archives",
        subtitle: "Frank Herbert's Masterpiece",
        description: "The complete Dune saga with exclusive artwork and author's notes.",
        handle: "dune-archives",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600",
        weight: 3500,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V23",
          title: "Complete Archive",
          sku: "DUNE-ARCH-001",
          inventory_quantity: 4,
          calculated_price: {
            calculated_amount: 22500,
            original_amount: 22500,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V24",
        title: "The Great Gatsby",
        subtitle: "Art Deco Edition",
        description: "F. Scott Fitzgerald's Jazz Age masterpiece with Art Deco illustrations.",
        handle: "great-gatsby-deco",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
        weight: 1000,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V25",
          title: "Limited Edition",
          sku: "GATSBY-DECO-001",
          inventory_quantity: 15,
          calculated_price: {
            calculated_amount: 4500,
            original_amount: 4500,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V26",
        title: "1984",
        subtitle: "Orwell's Dystopia",
        description: "George Orwell's prophetic novel in a special edition marking 75 years.",
        handle: "1984-anniversary",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
        weight: 900,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V27",
          title: "75th Anniversary",
          sku: "ORWELL-1984-001",
          inventory_quantity: 20,
          calculated_price: {
            calculated_amount: 3500,
            original_amount: 3500,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600" }],
        tags: [],
        categories: []
      } as any,
      {
        id: "prod_01HFGYQM87RC02GQGX47GZS9V28",
        title: "Don Quixote",
        subtitle: "Cervantes' Masterwork",
        description: "The complete adventures of Don Quixote with classic Spanish illustrations.",
        handle: "don-quixote-complete",
        is_giftcard: false,
        status: "published",
        thumbnail: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
        weight: 2400,
        variants: [{
          id: "variant_01HFGYQM87RC02GQGX47GZS9V29",
          title: "Complete Edition",
          sku: "CERVANTES-DQ-001",
          inventory_quantity: 9,
          calculated_price: {
            calculated_amount: 11000,
            original_amount: 11000,
            currency_code: "gbp",
          }
        }],
        options: [],
        images: [{ url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600" }],
        tags: [],
        categories: []
      } as any
    ]
    
    const filteredProducts = mockProducts.slice(offset, offset + limit)
    const nextPage = mockProducts.length > offset + limit ? pageParam + 1 : null
    
    return {
      response: {
        products: filteredProducts,
        count: mockProducts.length,
      },
      nextPage: nextPage,
      queryParams,
    }
  }
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}

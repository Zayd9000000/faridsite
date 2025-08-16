"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  // TEMPORARY: Skip API calls and use hardcoded regions for development
  console.log("[listRegions] Using hardcoded regions for development")
  return [{
    id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
    name: "Europe",
    currency_code: "gbp",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    metadata: null,
    countries: [
      { id: "gb", iso_2: "gb", iso_3: "gbr", num_code: "826", name: "UNITED KINGDOM", display_name: "United Kingdom" },
      { id: "dk", iso_2: "dk", iso_3: "dnk", num_code: "208", name: "DENMARK", display_name: "Denmark" },
      { id: "fr", iso_2: "fr", iso_3: "fra", num_code: "250", name: "FRANCE", display_name: "France" },
      { id: "de", iso_2: "de", iso_3: "deu", num_code: "276", name: "GERMANY", display_name: "Germany" },
      { id: "it", iso_2: "it", iso_3: "ita", num_code: "380", name: "ITALY", display_name: "Italy" },
      { id: "es", iso_2: "es", iso_3: "esp", num_code: "724", name: "SPAIN", display_name: "Spain" },
      { id: "se", iso_2: "se", iso_3: "swe", num_code: "752", name: "SWEDEN", display_name: "Sweden" },
      { id: "us", iso_2: "us", iso_3: "usa", num_code: "840", name: "UNITED STATES", display_name: "United States" }
    ]
  }] as any
  
  // COMMENTED OUT FOR DEVELOPMENT - UNCOMMENT WHEN YOU HAVE VALID PUBLISHABLE KEY
  /*
  // First try direct fetch which is more reliable
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''
    
    console.log("[listRegions] Attempting direct fetch from:", backendUrl)
    
    const directResponse = await fetch(`${backendUrl}/store/regions`, {
      headers: {
        'x-publishable-api-key': publishableKey,
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Ensure fresh data
    })
    
    if (directResponse.ok) {
      const data = await directResponse.json()
      console.log("[listRegions] Direct fetch succeeded:", data.regions?.length, "regions")
      return data.regions || []
    } else {
      console.error("[listRegions] Direct fetch failed with status:", directResponse.status)
    }
  } catch (e) {
    console.error("[listRegions] Direct fetch error:", e)
  }
  
  // Fallback to SDK if direct fetch fails
  try {
    const next = {
      ...(await getCacheOptions("regions")),
    }

    const response = await sdk.client
      .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
        method: "GET",
        next,
        cache: "force-cache",
      })
    
    console.log("[listRegions] SDK fetch succeeded:", response?.regions?.length, "regions")
    return response?.regions || []
  } catch (error: any) {
    console.error("[listRegions] SDK fetch also failed:", error.message)
  }
  
  // Ultimate fallback - return hardcoded region
  console.log("[listRegions] All fetches failed, returning hardcoded region")
        return [{
        id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
        name: "Europe",
        currency_code: "gbp",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
        countries: [
          { id: "gb", iso_2: "gb", iso_3: "gbr", num_code: "826", name: "UNITED KINGDOM", display_name: "United Kingdom" },
          { id: "dk", iso_2: "dk", iso_3: "dnk", num_code: "208", name: "DENMARK", display_name: "Denmark" },
          { id: "fr", iso_2: "fr", iso_3: "fra", num_code: "250", name: "FRANCE", display_name: "France" },
          { id: "de", iso_2: "de", iso_3: "deu", num_code: "276", name: "GERMANY", display_name: "Germany" },
          { id: "it", iso_2: "it", iso_3: "ita", num_code: "380", name: "ITALY", display_name: "Italy" },
          { id: "es", iso_2: "es", iso_3: "esp", num_code: "724", name: "SPAIN", display_name: "Spain" },
          { id: "se", iso_2: "se", iso_3: "swe", num_code: "752", name: "SWEDEN", display_name: "Sweden" },
          { id: "us", iso_2: "us", iso_3: "usa", num_code: "840", name: "UNITED STATES", display_name: "United States" }
        ]
      }] as any
  */
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError)
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode: string) => {
  try {
    console.log(`[getRegion] Called with countryCode: ${countryCode}`)
    
    if (regionMap.has(countryCode)) {
      console.log(`[getRegion] Found in cache for: ${countryCode}`)
      return regionMap.get(countryCode)
    }

    console.log("[getRegion] Cache miss, fetching regions...")
    const regions = await listRegions()
    console.log(`[getRegion] Fetched ${regions?.length || 0} regions`)

    // Clear and rebuild the map
    regionMap.clear()
    
    // Always ensure we have at least one region
    if (!regions || regions.length === 0) {
      console.log("[getRegion] No regions from API, using hardcoded region")
      const hardcodedRegion = {
        id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
        name: "Europe",
        currency_code: "gbp",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
        countries: [
          { id: "gb", iso_2: "gb", iso_3: "gbr", num_code: "826", name: "UNITED KINGDOM", display_name: "United Kingdom" },
          { id: "dk", iso_2: "dk", iso_3: "dnk", num_code: "208", name: "DENMARK", display_name: "Denmark" },
          { id: "us", iso_2: "us", iso_3: "usa", num_code: "840", name: "UNITED STATES", display_name: "United States" },
          { id: "fr", iso_2: "fr", iso_3: "fra", num_code: "250", name: "FRANCE", display_name: "France" },
          { id: "de", iso_2: "de", iso_3: "deu", num_code: "276", name: "GERMANY", display_name: "Germany" }
        ]
      } as any
      
      // Add to map for all countries
      hardcodedRegion.countries?.forEach((c) => {
        if (c?.iso_2) {
          regionMap.set(c.iso_2, hardcodedRegion)
        }
      })
      
      return hardcodedRegion
    }
    
    // Build the map from fetched regions
    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        if (c?.iso_2) {
          regionMap.set(c.iso_2, region)
        }
      })
    })
    
    console.log(`[getRegion] Built region map with ${regionMap.size} entries`)

    // Try to get the requested country's region
    let region = regionMap.get(countryCode)
    
    // If not found, try common fallbacks
    if (!region) {
      console.log(`[getRegion] Country ${countryCode} not found, trying fallbacks...`)
      const fallbacks = ["gb", "us", "de", "fr", "dk"]
      for (const fallback of fallbacks) {
        region = regionMap.get(fallback)
        if (region) {
          console.log(`[getRegion] Using fallback: ${fallback}`)
          break
        }
      }
    }
    
    // If still not found, return the first available region
    if (!region && regionMap.size > 0) {
      region = regionMap.values().next().value
      console.log(`[getRegion] Using first available region`)
    }
    
    // Final fallback - create a hardcoded region
    if (!region) {
      console.log(`[getRegion] No region found anywhere, creating fallback`)
      region = {
        id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
        name: "Europe", 
        currency_code: "gbp",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
        countries: [
          { iso_2: countryCode, iso_3: countryCode, num_code: "000", name: countryCode.toUpperCase(), display_name: countryCode.toUpperCase() }
        ]
      } as HttpTypes.StoreRegion
    }

    console.log(`[getRegion] Returning region: ${region?.id || 'null'}`)
    return region || {
      id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
      name: "Europe",
      currency_code: "gbp",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: null,
      countries: [
        { id: "gb", iso_2: "gb", iso_3: "gbr", num_code: "826", name: "UNITED KINGDOM", display_name: "United Kingdom" },
        { id: "dk", iso_2: "dk", iso_3: "dnk", num_code: "208", name: "DENMARK", display_name: "Denmark" },
        { id: "us", iso_2: "us", iso_3: "usa", num_code: "840", name: "UNITED STATES", display_name: "United States" }
      ]
    } as any
  } catch (e: any) {
    console.error("[getRegion] Error:", e)
    // Return hardcoded region on error
    return {
      id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
      name: "Europe", 
      currency_code: "gbp",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: null,
      countries: [
        { iso_2: "gb", iso_3: "gbr", num_code: "826", name: "UNITED KINGDOM", display_name: "United Kingdom" },
        { iso_2: "us", iso_3: "usa", num_code: "840", name: "UNITED STATES", display_name: "United States" }
      ]
    } as HttpTypes.StoreRegion
  }
}

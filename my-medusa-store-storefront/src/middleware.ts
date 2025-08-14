import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  // Skip region fetching for testing - use hardcoded region
  if (!regionMap.keys().next().value) {
    console.log("🚀 Using hardcoded region in middleware for testing")
    
    // Create a mock region map with just the Europe region
    const mockRegion = {
      id: "reg_01K2FSDGWWFA08RTVN7R12HWJD",
      name: "Europe",
      currency_code: "gbp",
      countries: [
        { id: "dk", iso_2: "dk", name: "Denmark" },
        { id: "gb", iso_2: "gb", name: "United Kingdom" },
        { id: "us", iso_2: "us", name: "United States" }
      ]
    } as any
    
    regionMap.set("dk", mockRegion)
    regionMap.set("gb", mockRegion)
    regionMap.set("us", mockRegion)
    
    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  try {
    let redirectUrl = request.nextUrl.href

    let response = NextResponse.redirect(redirectUrl, 307)

    let cacheIdCookie = request.cookies.get("_medusa_cache_id")

    let cacheId = cacheIdCookie?.value || crypto.randomUUID()

    const regionMap = await getRegionMap(cacheId)

    const countryCode = regionMap && (await getCountryCode(request, regionMap))

    const urlHasCountryCode =
      countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

    // if one of the country codes is in the url and the cache id is set, return next
    if (urlHasCountryCode && cacheIdCookie) {
      return NextResponse.next()
    }

    // if one of the country codes is in the url and the cache id is not set, set the cache id and continue
    if (urlHasCountryCode && !cacheIdCookie) {
      response = NextResponse.next()
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })

      return response
    }

    // check if the url is a static asset
    if (request.nextUrl.pathname.includes(".")) {
      return NextResponse.next()
    }

    const redirectPath =
      request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

    const queryString = request.nextUrl.search ? request.nextUrl.search : ""

    // If no country code is set, we redirect to the relevant region.
    if (!urlHasCountryCode && countryCode) {
      redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
      response = NextResponse.redirect(`${redirectUrl}`, 307)
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    // If there's an error, redirect to US region as fallback
    const urlPath = request.nextUrl.pathname
    if (!urlPath.startsWith("/us") && urlPath === "/") {
      return NextResponse.redirect(`${request.nextUrl.origin}/us`, 307)
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}

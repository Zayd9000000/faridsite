"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    // Check if authHeaders is empty object or has no authorization key
    if (!authHeaders || !('authorization' in authHeaders)) {
      console.log("❌ No auth headers found - user not logged in")
      return null
    }

    const headers = {
      ...authHeaders,
    }

    console.log("🔍 Attempting to retrieve customer with headers:", headers)

    try {
      // Use the SDK's built-in customer retrieve method
      const { customer } = await sdk.store.customer.retrieve(
        { fields: "*orders" },
        headers
      )
      
      console.log("✅ Customer data retrieved:", customer)
      return customer
    } catch (error: any) {
      console.log("❌ Failed to retrieve customer:", error)
      
      // Check if it's an authentication error
      if (error.status === 401) {
        console.log("❌ Authentication failed - token may be invalid or expired")
        console.log("Error details:", error.message || error)
        // Don't remove the token here, let the user handle re-authentication
      }
      
      return null
    }
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)

  return updateRes
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    console.log("🚀 Starting customer registration for:", customerForm.email)
    
    // Step 1: Register authentication identity
    console.log("📝 Step 1: Registering auth identity...")
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })
    
    if (!token) {
      console.error("❌ Failed to get registration token")
      return "Registration failed: No token received"
    }
    
    console.log("✅ Auth identity created, token received")
    await setAuthToken(token as string)

    // Step 2: Create customer profile with authenticated request
    console.log("📝 Step 2: Creating customer profile...")
    const headers = {
      ...(await getAuthHeaders()),
    }
    
    console.log("🔑 Using headers for customer creation:", headers)
    
    try {
      const { customer: createdCustomer } = await sdk.store.customer.create(
        customerForm,
        {},
        headers
      )
      
      console.log("✅ Customer profile created:", createdCustomer)
      
      // The customer should now exist in the database with has_account: true
      // This is what makes them appear in the admin dashboard
      
    } catch (customerError: any) {
      console.error("❌ Failed to create customer profile:", customerError)
      console.error("Error details:", customerError.message || customerError)
      
      // If customer creation fails, the auth identity exists but no customer record
      // This is a common issue that prevents customers from showing in admin
      return `Customer creation failed: ${customerError.message || customerError.toString()}`
    }

    // Step 3: Log in to get a fresh session token
    console.log("📝 Step 3: Logging in with new credentials...")
    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(loginToken as string)
    console.log("✅ Login successful, session established")

    // Step 4: Invalidate cache and transfer cart
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    try {
      await transferCart()
      console.log("✅ Cart transferred to customer")
    } catch (cartError) {
      console.log("⚠️ Cart transfer failed (non-critical):", cartError)
    }

    console.log("🎉 Registration complete! Redirecting to account page...")
    // Redirect to account page after successful registration
    redirect("/account")
  } catch (error: any) {
    console.error("❌ Registration error:", error)
    console.error("Error stack:", error.stack)
    return error.message || error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    console.log("🔐 Attempting login for:", email)
    
    const token = await sdk.auth.login("customer", "emailpass", { email, password })
    
    if (!token) {
      console.error("❌ No token received from login")
      return "Login failed: No authentication token received"
    }
    
    console.log("✅ Login successful, token received")
    
    // Set the authentication token
    await setAuthToken(token as string)
    console.log("✅ Auth token set in cookies")
    
    // Invalidate customer cache
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)
    
    // Transfer cart after successful login
    try {
      await transferCart()
      console.log("✅ Cart transferred")
    } catch (cartError) {
      console.log("⚠️ Cart transfer failed (non-critical):", cartError)
    }
    
    // Redirect to account page after successful login
    redirect("/account")
  } catch (error: any) {
    console.error("❌ Login error:", error)
    return error.message || error.toString()
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string)

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phone = formData.get("phone") as string

  if (phone) {
    address.phone = phone
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

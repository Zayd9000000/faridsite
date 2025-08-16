"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="font-serif text-[24px] leading-[28px] font-medium text-[#1A1A1A] flex items-center gap-2">
          Shipping Address
          {!isOpen && cart?.shipping_address && (
            <CheckCircleSolid className="text-green-600 w-5 h-5" />
          )}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-[12px] uppercase tracking-[0.8px] text-[#666] hover:text-[#1A1A1A] transition-colors"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2 className="font-serif text-[24px] leading-[28px] font-medium text-[#1A1A1A] mb-6 mt-8">
                  Billing Address
                </h2>
                <BillingAddress cart={cart} />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#1A1A1A] text-white py-4 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-black transition-all duration-200 mt-6"
              data-testid="submit-address-button"
            >
              Continue to Delivery
            </button>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-[14px]">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <p className="text-[11px] uppercase tracking-[0.8px] text-[#666] mb-3">
                      Shipping Address
                    </p>
                    <p className="text-[14px] text-[#1A1A1A] mb-1">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </p>
                    <p className="text-[14px] text-[#666]">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </p>
                    <p className="text-[14px] text-[#666]">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </p>
                    <p className="text-[14px] text-[#666]">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </p>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-contact-summary"
                  >
                    <p className="text-[11px] uppercase tracking-[0.8px] text-[#666] mb-3">
                      Contact
                    </p>
                    <p className="text-[14px] text-[#666]">
                      {cart.shipping_address.phone}
                    </p>
                    <p className="text-[14px] text-[#666]">
                      {cart.email}
                    </p>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <p className="text-[11px] uppercase tracking-[0.8px] text-[#666] mb-3">
                      Billing Address
                    </p>

                    {sameAsBilling ? (
                      <p className="text-[14px] text-[#666]">
                        Same as shipping address
                      </p>
                    ) : (
                      <>
                        <p className="text-[14px] text-[#1A1A1A] mb-1">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </p>
                        <p className="text-[14px] text-[#666]">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </p>
                        <p className="text-[14px] text-[#666]">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </p>
                        <p className="text-[14px] text-[#666]">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses
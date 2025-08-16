"use client"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="font-serif text-[24px] leading-[28px] font-medium text-[#1A1A1A]">
        Order Summary
      </h2>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="block w-full bg-[#1A1A1A] text-white py-4 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-black transition-all duration-200 text-center"
      >
        Proceed to Checkout
      </LocalizedClientLink>
    </div>
  )
}

export default Summary

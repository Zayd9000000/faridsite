import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-8">
        <h1 className="font-serif text-[40px] leading-[44px] font-medium text-[#1A1A1A]">Shopping Cart</h1>
      </div>
      <div className="border-t border-[#E5E5E5]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-4 text-[11px] uppercase tracking-[0.8px] text-[#666] border-b border-[#E5E5E5]">
          <div>Item</div>
          <div className="text-center">Quantity</div>
          <div className="text-center hidden md:block">Price</div>
          <div className="text-right">Total</div>
        </div>
        <div>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </div>
      </div>
    </div>
  )
}

export default ItemsTemplate

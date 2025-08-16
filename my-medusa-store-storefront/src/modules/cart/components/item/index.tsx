"use client"

import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import { Trash2 } from "lucide-react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  if (type === "preview") {
    return (
      <div className="flex items-center gap-4 py-4 border-b border-[#E5E5E5]">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-16"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
        <div className="flex-1">
          <h3 className="font-serif text-sm font-medium text-[#1A1A1A]">
            {item.product_title}
          </h3>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
          <div className="flex items-center gap-2 mt-1 text-sm text-[#666]">
            <span>Qty: {item.quantity}</span>
            <span>×</span>
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-6 border-b border-[#E5E5E5] items-center">
      <div className="flex gap-4">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-24 h-32"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
        <div>
          <h3 className="font-serif text-base font-medium text-[#1A1A1A] mb-2">
            {item.product_title}
          </h3>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
          <button
            className="mt-3 text-xs text-[#666] hover:text-red-600 transition-colors flex items-center gap-1"
            onClick={() => deleteLineItem(item.id)}
            data-testid="product-delete-button"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-2 items-center">
          <CartItemSelect
            value={item.quantity}
            onChange={(value) => changeQuantity(parseInt(value.target.value))}
            className="w-16 h-10 px-3 border border-[#E5E5E5] text-sm"
            data-testid="product-select-button"
          >
            {Array.from(
              {
                length: Math.min(maxQuantity, 10),
              },
              (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              )
            )}
          </CartItemSelect>
          {updating && <Spinner />}
        </div>
        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>

      <div className="hidden md:flex justify-center">
        <LineItemUnitPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>

      <div className="flex justify-end">
        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
}

export default Item
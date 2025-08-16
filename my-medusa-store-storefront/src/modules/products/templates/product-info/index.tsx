import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="font-serif">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-[14px] text-ui-fg-muted hover:text-ui-fg-subtle font-serif font-medium tracking-wide"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-[36px] leading-[40px] text-ui-fg-base font-serif font-medium"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-[15px] leading-[22px] text-ui-fg-subtle whitespace-pre-line font-serif font-normal"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo

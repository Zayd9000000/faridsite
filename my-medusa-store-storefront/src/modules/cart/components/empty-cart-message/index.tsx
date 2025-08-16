import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 flex flex-col items-center text-center" data-testid="empty-cart-message">
      <h1 className="font-serif text-[40px] leading-[44px] font-medium text-[#1A1A1A] mb-6">
        Your Cart is Empty
      </h1>
      <p className="text-[15px] leading-[24px] text-[#666] mb-8 max-w-[32rem]">
        Discover our carefully curated collection of rare and limited edition books.
        Each volume is a masterpiece waiting to find its place in your library.
      </p>
      <LocalizedClientLink 
        href="/store"
        className="bg-[#1A1A1A] text-white px-8 py-3 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-black transition-all duration-200"
      >
        Explore Collection
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage

import { retrieveCart } from "@lib/data/cart"
import FolioNav from "./folio-nav"

export default async function Nav() {
  const cart = await retrieveCart().catch(() => null)
  
  const totalItems = cart?.items?.reduce((acc, item) => {
    return acc + item.quantity
  }, 0) || 0
  
  return <FolioNav cartItemCount={totalItems} />
}

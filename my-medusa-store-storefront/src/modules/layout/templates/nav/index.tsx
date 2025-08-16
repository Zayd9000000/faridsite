import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import FolioNav from "./folio-nav"

export default async function Nav() {
  const [cart, customer] = await Promise.all([
    retrieveCart().catch(() => null),
    retrieveCustomer().catch(() => null)
  ])
  
  const totalItems = cart?.items?.reduce((acc, item) => {
    return acc + item.quantity
  }, 0) || 0
  
  return <FolioNav cartItemCount={totalItems} customer={customer} />
}

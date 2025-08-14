import { retrieveCart } from "@lib/data/cart"
import CartDropdownClient from "../cart-dropdown"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  return <CartDropdownClient cart={cart} />
}

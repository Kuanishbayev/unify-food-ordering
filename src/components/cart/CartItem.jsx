import { useContext } from "react"
import { formatCurrency } from "../../utilities/numberFormat"
import { CartContext } from "../../context/cart/CartContext"

const CartItem = ({id, image, name, ingredients, price, quantity}) => {
  const {cartItems, setCartItems} = useContext(CartContext)
  const MAX_ORDER_COUNT = 15

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id && item.quantity < MAX_ORDER_COUNT) {
        item.quantity += 1
      }
      return item
    }))
  }

  const decreaseQuantity = (id) => {
    if (quantity > 1) {
      setCartItems(cartItems.map(item => {
        if (item.id === id) {
          item.quantity -= 1
        }
        return item
      }))
    } else {
      setCartItems(cartItems.filter(item => item.id !== id))
    }
  }
  return (
    <div className="flex justify-between items-center p-4 shadow-[0_0_12px_0_#00000014] rounded-2xl mx-4">
      <div className="flex items-center gap-4">
        <div className="size-[86px]">
            <img className="object-cover" src={`./product-images/${image}`} />
        </div>
        <div>
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-gray-500 font-bold">{[...ingredients.join(', ')]}</p>
            <p className="bg-gradient-to-r from-[#8CD23C] to-[#417A00] bg-clip-text text-transparent font-bold">{formatCurrency(price * quantity)}</p>
        </div>
      </div>
      <div className="bg-[#EDF2F6] rounded-full p-1 flex flex-col items-center gap-4 font-semibold text-xl">
          <button className="bg-white rounded-full size-6 flex items-center justify-center">
            <span className="bg-gradient-to-r from-[#8CD23C] to-[#417A00] bg-clip-text text-transparent" onClick={() => increaseQuantity(id)}>+</span>
          </button>
          <p className="bg-gradient-to-r from-[#8CD23C] to-[#417A00] bg-clip-text text-transparent">{quantity}</p>
          <button className="bg-white rounded-full size-6 flex items-center justify-center">
            <span className="bg-gradient-to-r from-[#8CD23C] to-[#417A00] bg-clip-text text-transparent" onClick={() => decreaseQuantity(id)}>-</span>
          </button>
      </div>
    </div>
  )
}

export default CartItem
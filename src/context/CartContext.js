import { createContext } from "react";

const CartContext = createContext({
    cart: [],
    setCart: () => {},
    addToCart: () => {},
    increaseCartQuantity: () => {},
    decreaseCartQuantity: () => {}
})

export default CartContext
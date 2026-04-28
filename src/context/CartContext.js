import { createContext } from "react";

const CartContext = createContext({
    cart: [],
    setCart: () => {},
    addToCart: () => {}
})

export default CartContext
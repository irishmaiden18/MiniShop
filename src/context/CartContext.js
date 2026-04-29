import { createContext, useContext, useState } from "react";

const CartContext = createContext({
    cart: [],
    setCart: () => {},
    addToCart: () => {},
    increaseCartQuantity: () => {},
    decreaseCartQuantity: () => {}
})

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])

    const increaseCartQuantity = (id) => {

        const productInCart = cart.find((product) => product.id === id)

        const updatedCart = cart.map ((product) => {
            if (product.id === id) {
                const updatedProduct = {
                ...productInCart,
                quantity: Number(productInCart.quantity) + 1
                }
                return updatedProduct
            } else {
                return product
            }
        })
        setCart(updatedCart)
    }

    const decreaseCartQuantity = (id) => {

        const productInCart = cart.find((product) => product.id === id)

        let updatedCart = []
        if (productInCart.quantity > 1) {
            updatedCart = cart.map ((product) => {
                if (product.id === id) {
                    const updatedProduct = {
                        ...productInCart,
                        quantity: Number(productInCart.quantity) - 1
                    }
                    return updatedProduct
                } else {
                    return product
                }
            })
        } else if (productInCart.quanty === 1) {
            updatedCart = cart.filter((product) => product.id !== id)
        }
        setCart(updatedCart)
    }

    return (
        <CartContext.Provider value={{ cart, increaseCartQuantity, decreaseCartQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
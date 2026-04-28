import { useContext } from "react"
import CartContext from "../context/CartContext"
import MiniProductCard from "./MiniProductCard"

const Cart = () => {

    const {cart} = useContext(CartContext)

  return (
    <>
        <h2>Cart</h2>
            <ul>
                {cart ? (
                    cart.map((product) => (
                        <li key={product.id}>
                            <MiniProductCard image={product.images[0]} title={product.title} price={product.price} id={product.id} quantity={product.quantity}/>
                        </li>
                    ))
                ) : (
                    <h2>No Data</h2>
                )}
            </ul>
    </>
  )
}

export default Cart
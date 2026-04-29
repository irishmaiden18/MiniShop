import { useContext } from "react"
import CartContext from "../context/CartContext"
import MiniProductCard from "./MiniProductCard"
import { Link } from "react-router"

const Cart = () => {

    const {cart} = useContext(CartContext)

    const totalPrice = (array) => {
        let total = 0
        for (let i = 0; i < array.length; i++) {
            total += (Number(array[i].price) * Number(array[i].quantity))
            console.log(array[i])
            console.log(total)
        }
        return total
    }

    const total = totalPrice(cart)

    const checkout = () => {
        alert(`Checked out! Total price: $${total}.00`)
    }

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
        <h3>Total Price: ${total}.00</h3>
        <Link to="/"><button>Continue Shopping</button></Link>
        <button onClick={checkout}>Checkout</button>
    </>
  )
}

export default Cart
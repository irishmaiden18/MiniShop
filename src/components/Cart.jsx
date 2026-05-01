import { useContext } from "react"
import CartContext from "../context/CartContext"
import MiniProductCard from "./MiniProductCard"
import { Link } from "react-router"
import OrdersContext from "../context/OrdersContext"
import { useAuth0 } from "@auth0/auth0-react"

const Cart = () => {

    const {cart} = useContext(CartContext)

    const {orders, setOrders} = useContext(OrdersContext)

    const {user} = useAuth0()

    const totalPrice = (array) => {
        let total = 0
        for (let i = 0; i < array.length; i++) {
            total += (Number(array[i].price) * Number(array[i].quantity))
            // console.log(array[i])
            // console.log(total)
        }
        return total
    }

    const total = totalPrice(cart)

    const checkout = () => {
        alert(`Checked out! Total price: $${total}.00`)

        console.log(cart)

        if (orders.length === 0) {
            setOrders([cart])
        } else {
            setOrders([...orders, cart])
        }

        console.log(orders)
    }

  return (
    <>
        <h2>Cart</h2>
        <ul>
            {cart ? (
                cart.map((product) => (
                    <li key={product.id}>
                        <MiniProductCard product={product} quantity={product.quantity}/>
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
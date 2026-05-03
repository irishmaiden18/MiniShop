import { useContext } from "react"
import OrdersContext from "../context/OrdersContext"
import MiniProductCard from "./MiniProductCard"
import { Link } from "react-router"

const OrderHistory = () => {

    const {orders} = useContext(OrdersContext)

    console.log(orders)

  return (
    <>
        <h1>Order History</h1>
        <ul>
            {orders ? (
                orders.map((cart, index) => (
                    <li key={index}>
                        <h3>Order {index + 1}</h3>
                        <ul>
                            {cart.map((product) => (
                                <li key={product.id}>
                                    <MiniProductCard product={product} quantity={product.quantity}/>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
            ) : (
                <h2>No Data</h2>
            )}
        </ul>
        <Link to="/"><button>Continue Shopping</button></Link>
    </>
  )
}

export default OrderHistory
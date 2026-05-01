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
                        <h3>Order {index}</h3>
                        <ul>
                            {cart.map((product) => (
                                <li key={product.id}>
                                    <img src={product.images[0]} alt={`${product.title} pic`} width={250} />
                                    <h2>{product.title}</h2>
                                    <p>${product.price}.00</p>
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
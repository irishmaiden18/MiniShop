import { useContext } from "react"
import CartContext from "../context/CartContext"
import MiniProductCard from "./MiniProductCard"
import { Link } from "react-router"
import OrdersContext from "../context/OrdersContext"
import { useAuth0 } from "@auth0/auth0-react"
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"
import CheckoutComponent from "./CheckoutComponent"

const Cart = () => {

    const {cart, setCart} = useContext(CartContext)

    const {orders, setOrders} = useContext(OrdersContext)

    const {user} = useAuth0()

    const apiKey = import.meta.env.VITE_PAYPAL_CLIENT_ID

    const totalPrice = (array) => {
        let total = 0
        for (let i = 0; i < array.length; i++) {
            total += (Number(array[i].price) * Number(array[i].quantity))
        }
        return total
    }

    const totalQty = (array) => {
        let qty = 0
        for (let i = 0; i <array.length; i++) {
            qty += Number(array[i].quantity)
        }
        return qty
    }

    const total = totalPrice(cart)
    const roundedTotal = total.toFixed(2)
    const qty = totalQty(cart)

    const checkout = () => {
        alert(`Checked out! Total price: $${roundedTotal}${roundedTotal===0 ? ".00" : ""}`)

        console.log(cart)

        if (orders.length === 0) {
            setOrders([cart])
            setCart([])
        } else {
            setOrders([...orders, cart])
            setCart([])
        }

        console.log(orders)
    }

    const initialOptions = {
        "client-id": apiKey,
        currency: "USD",
        intent: "capture"
    }

  return (
    <>
        <h2 className="text-center text-4xl py-8">Cart</h2>
        <div className="bg-white p-4 mb-4 min-[660px]:rounded-xl w-fit mx-auto">
            <h3 className="text-red-600 font-bold px-2">PLEASE NOTE! This is NOT a real website, it is an EXAMPLE! You CANNOT really order items from here! Nothing will EVER be shipped to you!</h3>
        </div>
        <ul className="w-[75%] md:w-[96%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
        <div className="flex flex-col xl:flex-row justify-between">
            <div className="flex flex-col justify-center items-center w-full xl:flex-1">
                <h3 className="text-center py-8 font-bold text-2xl">Total ({qty}): ${roundedTotal}{roundedTotal===0 && ".00"}</h3>
                <div className="flex justify-center items-center">
                    <Link to="/"><button className="bg-[#01796F] text-white w-50 text-center rounded-xl pt-2 pb-3 mb-12">Continue Shopping</button></Link>
                </div>
            </div>
            <div className="flex flex-col items-center xl:pt-12"> 
                <button onClick={checkout} className="bg-[#01796F] text-white w-full md:w-[750px] text-center py-4 mb-4 lg:font-bold text-xl">Checkout</button>
                <PayPalScriptProvider options={initialOptions}>
                    <div className="w-full md:w-[750px] flex flex-col items-stretch">
                        <CheckoutComponent PayPalButtons={PayPalButtons} total={total}/>
                    </div>
                </PayPalScriptProvider>
            </div>
        </div>
    </>
  )
}

export default Cart
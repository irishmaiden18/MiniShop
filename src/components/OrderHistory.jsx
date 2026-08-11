import { useContext } from "react"
import OrdersContext from "../context/OrdersContext"
import MiniProductCard from "./MiniProductCard"
import { Link } from "react-router"

const OrderHistory = () => {

    const {orders} = useContext(OrdersContext)

    console.log(orders)

    const generateOrderNumber = () => {
        const data = new Date().toISOString()
        const orderNumber = data.slice(0, 13)
        const randomNumber = Math.floor(Math.random() * 4000) + 1
        return `${orderNumber}-${randomNumber}`
    }

    const totalQty = (array) => {
        let qty = 0
        for (let i = 0; i <array.length; i++) {
            qty += Number(array[i].quantity)
        }
        return qty
    }

    const totalPrice = (array) => {
        let total = 0
        for (let i = 0; i < array.length; i++) {
            total += (Number(array[i].price) * Number(array[i].quantity))
        }
        const roundedTotal = total.toFixed(2)
        return roundedTotal
    }

  return (
    <>
        <h1 className="text-center text-4xl py-8">Order History</h1>
        <ul>
            {orders ? (
                orders.map((cart, index) => (
                    <li key={index}>
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center text-2xl py-2 px-4 bg-[#01796F]/50">
                            <h3 className="mb-2 lg:mb-0 text-center">Order # {generateOrderNumber()}</h3>
                            <div className="flex justify-between w-full lg:w-auto lg:gap-8">
                                <h3>Total Items: {totalQty(cart)}</h3>
                                <h3>Total Price: ${totalPrice(cart)}</h3>
                            </div>
                        </div>
                        <ul className="w-[60%] md:w-[96%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-10">
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
        <div className="flex justify-center items-center">
            <Link to="/"><button className="bg-[#01796F] text-white w-50 text-center rounded-xl pt-2 pb-3 mb-12">Continue Shopping</button></Link>
        </div>
    </>
  )
}

export default OrderHistory
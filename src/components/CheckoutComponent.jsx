import { useAuth0 } from "@auth0/auth0-react"
import { useContext } from "react"
import CartContext from "../context/CartContext"
import OrdersContext from "../context/OrdersContext"

const CheckoutComponent = ({PayPalButtons, total}) => {

    const {user} = useAuth0()

    const {cart, setCart} = useContext(CartContext)

    const {orders, setOrders} = useContext(OrdersContext)


    const checkout = () => {

        if (orders.length === 0) {
            setOrders([cart])

        } else {
            setOrders([...orders, cart])
        }

        setCart([])
    }

  return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total, // Amount to charge
                            },
                        },
                    ],
                })
            }}
            // onApprove={(data, actions) => {
            //     checkout()
            //     // return actions.order.capture().then((details) => {
            //     //     alert(`Transaction completed by ${details.payer.name.given_name}`);
            //     // })
            // }}
            onApprove={() => {checkout()}}
        />
    )
}

export default CheckoutComponent
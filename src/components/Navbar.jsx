import { useContext } from "react"
import { Link } from "react-router"
import CartContext from "../context/CartContext"

const Navbar = () => {

  const {cart} = useContext(CartContext)

  const cartTotal = (array) => {
    let total = 0
    for(let i = 0; i < array.length; i++) {
      total += Number(array[i].quantity)
    }
    return total
  }

  const totalItemsInCart = cartTotal(cart)

  return (
    <>
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
            </div>
            <div>
              <h3>Cart: {totalItemsInCart}</h3>
            </div>
        </nav>
    </>
  )
}

export default Navbar
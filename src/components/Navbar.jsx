import { useContext } from "react"
import { Link } from "react-router"
import CartContext from "../context/CartContext"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import profileIcon from "/profileIcon.svg"

const Navbar = () => {

  const {isAuthenticated, user} = useAuth0()
  // console.log(user)

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
                {isAuthenticated && <Link to="/new">Add New Product</Link>}
            </div>
            <div>
              <h3>Cart: {totalItemsInCart}</h3>
            </div>
            <div>
              {isAuthenticated ?
                <>
                  <p>Welcome {user.name}! <img src={user.picture} alt={`${user.name} pic`} width={50} onError={(e) => (e.currentTarget.src=profileIcon)}/></p>
                  <LogoutButton/>
                </> :
                <>
                  <p>Welcome Guest! <img src={profileIcon}/></p>
                  <LoginButton/>
                </>
              }
            </div>
        </nav>
    </>
  )
}

export default Navbar
import { useContext } from "react"
import { Link } from "react-router"
import CartContext from "../context/CartContext"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"

const Navbar = () => {

  const {isAuthenticated, user} = useAuth0()
  console.log(user)

  const {cart} = useContext(CartContext)

  const profileIcon = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>

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
                  <p>Welcome {user.name}! <img src={user.picture} alt={`${user.name} pic`} width={50} onError={(e) => (e.currentTarget.src={profileIcon})}/></p>
                  <LogoutButton/>
                </> :
                <>
                  <p>Welcome Guest! {profileIcon}</p>
                  <LoginButton/>
                </>
              }
            </div>
        </nav>
    </>
  )
}

export default Navbar
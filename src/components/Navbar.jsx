import { useContext, useState } from "react"
import { Link } from "react-router"
import CartContext from "../context/CartContext"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import { PersonCircle, Cart2 } from "react-bootstrap-icons"
import ProfileImage from "./ProfileImage"


const Navbar = () => {

  const {isAuthenticated, user} = useAuth0()

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
                {isAuthenticated && <Link to="/orderHistory">Order History</Link>}
            </div>
            <div>
              <h3><Cart2 color="black" size={50}/> {totalItemsInCart}</h3>
            </div>
            <div>
              {isAuthenticated ?
                <>
                  <p>Welcome {user.name}! <ProfileImage/></p>

                  <LogoutButton/>
                </> :
                <>
                {/*  <img src={profileIcon}/>*/}
                  <p>Welcome Guest! <PersonCircle color="royalblue" size={50}/></p>
                  <LoginButton/>
                </>
              }
            </div>
        </nav>
    </>
  )
}

export default Navbar
import { useContext, useState } from "react"
import { Link } from "react-router"
import CartContext from "../context/CartContext"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import { PersonCircle, Cart2 } from "react-bootstrap-icons"
import ProfileImage from "./ProfileImage"
import OrdersContext from "../context/OrdersContext"


const Navbar = () => {

  const {isAuthenticated, user} = useAuth0()

  const {cart} = useContext(CartContext)

  const {orders} = useContext(OrdersContext)

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
        <nav className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-4 lg:gap-0 pb-2 lg:px-6">

            {/* nav links */}
            <div className="flex gap-4 items-center">
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                {isAuthenticated && <Link to="/new">Add New Product</Link>}
                {isAuthenticated && <Link to="/orderHistory">Order History ({orders.length})</Link>}
            </div>

            {/* right aligned stuff */}
            <div className="flex items-center gap-4">
              {/* User info/login/logout */}
              <div>
                {isAuthenticated ?
                  <div className="flex items-center gap-4">
                    <p className="flex items-center gap-4 m-0">Welcome {user.name}! <ProfileImage/></p>
                    <LogoutButton/>
                  </div> :
                  <div className="flex items-center gap-4">
                  {/*  <img src={profileIcon}/>*/}
                    <p className="flex items-center gap-2 m-0">Welcome Guest! <PersonCircle color="royalblue" size={50}/></p>
                    <LoginButton/>
                  </div>
                }
              </div>

              {/* cart counter */}
              <div className="flex items-center gap-1">
                <Cart2 color="black" size={30}/>
                <h3 className="text-md font-bold">{totalItemsInCart}</h3>
              </div>
            </div>

        </nav>
    </>
  )
}

export default Navbar
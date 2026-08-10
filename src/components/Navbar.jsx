import { useContext, useState } from "react"
import { Link } from "react-router"
import CartContext from "../context/CartContext"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import { PersonCircle, Cart2, List, X } from "react-bootstrap-icons"
import ProfileImage from "./ProfileImage"
import OrdersContext from "../context/OrdersContext"


const Navbar = () => {

  const {isAuthenticated, user} = useAuth0()

  const {cart} = useContext(CartContext)

  const {orders} = useContext(OrdersContext)

  const [isOpen, setIsOpen] = useState(false)

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

      <div className="bg-[#01796F] text-white">

        <div className="pt-4 pb-3 lg:pb-4 px-4 lg:px-6 w-full">

          <div className="flex flex-col lg:flex-row items-center gap-2 pb-6 lg:pb-8">
            <img 
              src="cat_pushing_shopping_cart.png" 
              alt="orange cat pushing a shopping cart" 
              className="w-16 lg:w-10 h-auto rounded-full object-cover"
            />
            <span className="text-xl md:text-2xl">MiniShop</span>
          </div>

          {/* master row div: displays as a vertical column on mobile, changes to a single row on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 w-full gap-4 lg:gap-0">
            
            {/* first mobile row: controls the top line layout on mobile (hamburger + user/cart info) */}
            <div className="flex items-center justify-between w-full lg:flex-1 lg:order-2">
              
              {/* mobile: sits left of the hamburger menu. desktop: moves to the far right */}
              <div className="flex items-center gap-4 justify-start order-1 lg:ml-auto">
                <div>
                  {isAuthenticated ? (
                    <div className="flex items-center gap-2">
                      <p className="flex items-center">
                        Welcome {user.name}!
                      </p>
                      <ProfileImage />
                      <LogoutButton />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="flex items-center">
                        Welcome Guest!
                      </p>
                      <PersonCircle color="white" size={25}/>
                      <LoginButton />
                    </div>
                  )}
                </div>

                {/* cart counter element */}
                <Link to="/cart">
                  <div className="flex items-center gap-1 py-1">
                    <Cart2 color="white" size={30} />
                    <span className="font-bold pl-1 lg:pl-0">{totalItemsInCart}</span>
                  </div>
                </Link>
              </div>

              {/* hamburger button */}
              <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)} 
                className="block lg:hidden text-white cursor-pointer p-1 order-2"
                aria-label="toggle navigation menu"
              >
                {isOpen ? <X size={35} /> : <List size={35} />}
              </button>

            </div>

            {/* second mobile row: collapsible links */}
            <nav className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto text-center lg:pt-0 mt-2 lg:mt-0 order-3 lg:order-1`}>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
              {isAuthenticated && (
                <Link to="/new" onClick={() => setIsOpen(false)}>Add New Product</Link>
              )}
              {isAuthenticated && (
                <Link to="/orderHistory" onClick={() => setIsOpen(false)}>
                  Order History ({orders.length})
                </Link>
              )}
            </nav>

          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
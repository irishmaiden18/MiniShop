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
      {/* defines background and text color of header */}
      <div className="bg-[#01796F] text-white"> 

          {/* defines header spacing*/}
          <div className="pt-4 pb-3 lg:pb-4 px-4 lg:px-6 w-full"> 
              <div className="flex flex-col lg:flex-row items-center gap-2 pt-2 lg:pt-0 pb-2 lg:pb-8"> 
                  <img src="cat_pushing_shopping_cart.png" alt="orange cat pushing a shopping cart" className="w-16 lg:w-10 h-auto rounded-full object-cover" /> 
                  <span className="text-xl md:text-2xl">MiniShop</span> 
              </div> 

              {/* sets the layout to vertical stacking for mobile and horizontal stacking for large screens */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 w-full gap-4 lg:gap-0"> 
                  
                  {/* xs screens ONLY */}
                  <div className="flex sm:hidden flex-col w-full order-1 gap-2">

                      {/* line 1 */}
                      <div className="flex justify-center items-center gap-2 w-full">
                          {isAuthenticated ? (
                              <>
                                  <p>Welcome {user.name}!</p>
                                  <ProfileImage />
                              </>
                          ) : (
                              <>
                                  <p>Welcome Guest!</p>
                                  <PersonCircle color="white" size={25}/>
                              </>
                          )}
                      </div>
                      {/* end of line 1 */}

                      {/* line 2 */}
                      <div className="grid grid-cols-3 items-center w-full px-2">

                          {/* left column */}
                          <div className="flex justify-start">
                              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                          </div>
                          
                          {/* middle column */}
                          <div className="flex justify-center">
                              <Link to="/cart"> 
                                  <div className="flex items-center gap-1 py-1"> 
                                      <Cart2 color="white" size={30} /> 
                                      <span className="font-bold pl-1">{totalItemsInCart}</span> 
                                  </div> 
                              </Link>
                          </div>
                          
                          {/* right column: hamburger menu/x button*/}
                          <div className="flex justify-end">
                              <button 
                                  type="button" 
                                  onClick={() => setIsOpen(!isOpen)} 
                                  className="text-white cursor-pointer p-1" 
                                  aria-label="toggle navigation menu"
                              > 
                                  {isOpen ? <X size={35} /> : <List size={35} />} 
                              </button>
                          </div>
                      </div>
                      {/* end of line 2 */}
                  </div>
                  {/* end of mobile layout */}

                  {/* larger screens (sm and above) */}
                  <div className="hidden sm:flex items-center justify-between w-full lg:flex-1 lg:order-2"> 

                      {/* aligned left in sm and md screens and aligned right in large screens and above */}
                      <div className="flex items-center gap-4 justify-start order-1 lg:ml-auto">
                          <div>
                              {isAuthenticated ? (
                                  <div className="flex items-center gap-2">
                                      <p className="flex items-center">Welcome {user.name}!</p>
                                      <ProfileImage />
                                      <LogoutButton />
                                  </div>
                              ) : (
                                  <div className="flex items-center gap-2">
                                      <p className="flex items-center">Welcome Guest!</p>
                                      <PersonCircle color="white" size={25}/>
                                      <LoginButton />
                                  </div>
                              )}
                          </div> 
                          <Link to="/cart"> 
                              <div className="flex items-center gap-1 py-1"> 
                                  <Cart2 color="white" size={30} /> 
                                  <span className="font-bold lg:pl-0">{totalItemsInCart}</span> 
                              </div> 
                          </Link> 
                      </div>
                      {/*end of aligned right section  */}

                      {/* alternate aligned right section for small and medium screens hidden on large screens */}
                      <button 
                          type="button" 
                          onClick={() => setIsOpen(!isOpen)} 
                          className="block lg:hidden text-white cursor-pointer p-1 order-2" 
                          aria-label="toggle navigation menu"
                      > 
                          {isOpen ? <X size={35} /> : <List size={35} />} 
                      </button>
                  </div>
                   {/* end larger screen section  */}

                  {/* nav links */}
                  <nav className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto text-center lg:pt-0 mt-2 lg:mt-0 order-3 lg:order-1`}> 
                      <Link to="/" onClick={() => setIsOpen(false)}>Home</Link> 
                      <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link> 
                      {isAuthenticated && ( <Link to="/new" onClick={() => setIsOpen(false)}>Add New Product</Link> )} 
                      {isAuthenticated && ( 
                          <Link to="/orderHistory" onClick={() => setIsOpen(false)}> Order History ({orders.length}) </Link> 
                      )} 
                  </nav> 
              </div>
              {/* ends the vertical/horizontal stacking layout for the page  */}

          </div>
          {/* ends header spacing section  */}

      </div>
      {/* ends background formating section */}
    </>
  )
}

export default Navbar
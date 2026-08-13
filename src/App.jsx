import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'
import ProductListContext from './context/ProductListContext'
import AddProduct from './components/AddProduct'
import AuthenticationGuard from './components/AuthenticationGuard'
import OrdersContext from './context/OrdersContext'
import OrderHistory from './components/OrderHistory'
import DuringDevelopment from './components/DuringDevelopment'
import Footer from './components/Footer'

function App() {
  
  const [cart, setCart] = useState([])

  const [productList, setProductList] = useState(null)

  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  useEffect (() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=0")
      const resData = await res.json()
      setProductList(resData.products)
    }
    fetchData()
  }, [])

  const addProduct = (product) => {
    setProductList([...productList, product])
  }

  const addToCart = (id) => {

    const product = productList.find((product) => product.id === id)
    
    const productInCart = cart.find((product) => product.id === id)

    if (!productInCart) {
      const newCartProduct = {
        ...product,
        quantity: 1
      }
      setCart([...cart, newCartProduct])

    } else {

      const updatedCart = cart.map ((product) => {

        if (product.id === id) {
          const updatedProduct = {
            ...productInCart,
            quantity: Number(productInCart.quantity) + 1
          }
          return updatedProduct
        } else {
          return product
        }
      })
      setCart(updatedCart)
    }
    navigate("/cart")
  }

  const increaseCartQuantity = (id) => {

    const productInCart = cart.find((product) => product.id === id)

    const updatedCart = cart.map ((product) => {
      if (product.id === id) {
        const updatedProduct = {
          ...productInCart,
          quantity: Number(productInCart.quantity) + 1
        }
        return updatedProduct
      } else {
        return product
      }
    })
    setCart(updatedCart)
  }

  const decreaseCartQuantity = (id) => {

    const productInCart = cart.find((product) => product.id === id)

    let updatedCart = []
    if (productInCart.quantity > 1) {
      updatedCart = cart.map ((product) => {
        if (product.id === id) {
          const updatedProduct = {
            ...productInCart,
            quantity: Number(productInCart.quantity) - 1
          }
          return updatedProduct
        } else {
          return product
        }
      })
    } else if (productInCart.quanty = 1) {
      updatedCart = cart.filter((product) => product.id !== id)
    }
    setCart(updatedCart)
  }

  return (
    <OrdersContext value={{
      orders: orders,
      setOrders: setOrders
    }}>
      <ProductListContext value={{
        productList: productList,
        setProductList: setProductList,
        addProduct: addProduct
      }}>
        <CartContext value={{
          cart: cart,
          setCart: setCart,
          addToCart: addToCart,
          increaseCartQuantity: increaseCartQuantity,
          decreaseCartQuantity: decreaseCartQuantity
        }}>

          {/* <DuringDevelopment/> */}

          <div className="bg-[#E4D2BA] min-h-screen flex flex-col">

            <div className="container mx-auto flex flex-col flex-1">

              <Navbar/>

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/new" element={<AuthenticationGuard component={AddProduct} />}/>
                  <Route path="/orderHistory" element={<AuthenticationGuard component={OrderHistory}/>}/>
                </Routes>
              </main>
              
              <Footer/>
            </div>
          </div>
        </CartContext>
      </ProductListContext>
    </OrdersContext>
  )
}

export default App

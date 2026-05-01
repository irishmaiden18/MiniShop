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

function App() {
  
  const [cart, setCart] = useState([])

  const [productList, setProductList] = useState(null)

  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  useEffect (() => {
      const fetchData = async () => {
          const res = await fetch("https://api.escuelajs.co/api/v1/products")
          const resData = await res.json()

          const updatedProductList = resData.map ((product) => {
            
            const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
            const numReviews = Math.floor(Math.random() * 6)
            let customerReviews = []
            for (let i = 0; i < numReviews; i++) {
              const randomText = Math.floor(Math.random() * 203) + 10
              const review = string.slice(0, randomText)
              customerReviews.push(review)
            }

            const updatedProduct ={
              ...product,
              customerRating: (Math.random() * 5).toFixed(1),
              customerReviews: customerReviews
            }
            
            return updatedProduct
          })

        setProductList(updatedProductList)
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
      setOrders, setOrders
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
          <h1>MiniShop</h1>

          <Navbar/>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/new" element={<AuthenticationGuard component={AddProduct} />}/>
            <Route path="/orderHistory" element={<AuthenticationGuard component={OrderHistory}/>}/>
          </Routes>
        </CartContext>
      </ProductListContext>
    </OrdersContext>
  )
}

export default App

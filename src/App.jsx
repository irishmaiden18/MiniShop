import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import CartContext, { CartProvider, useCart } from './context/CartContext'
import Home from './components/Home'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'
import ProductListContext from './context/ProductListContext'

function App() {
  
  const {cart, increaseCartQuantity, decreaseCartQuantity} = useCart()

  const [productList, setProductList] = useState(null)

  useEffect (() => {
      const fetchData = async () => {
          const res = await fetch("https://api.escuelajs.co/api/v1/products")
          const resData = await res.json()

          const updatedProductList = resData.map ((product) => {
            
            const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
            const numReviews = Math.floor(Math.random() * 11)
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
    }

  return (
    <ProductListContext value={{
      productList: productList,
      setProductList: setProductList
    }}>
    <CartProvider>
      <h1>MiniShop</h1>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </CartProvider>
    </ProductListContext>
  )
}

export default App

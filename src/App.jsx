import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'
import ProductListContext from './context/ProductListContext'

function App() {
  
  const [cart, setCart] = useState([])

  const [productList, setProductList] = useState(null)

    useEffect (() => {
        const fetchData = async () => {
            const res = await fetch("https://api.escuelajs.co/api/v1/products")
            const resData = await res.json()
            setProductList(resData)
            console.log(resData)
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
    <CartContext value={{
      cart: cart,
      setCart: setCart,
      addToCart: addToCart
    }}>
      <h1>MiniShop</h1>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </CartContext>
    </ProductListContext>
  )
}

export default App

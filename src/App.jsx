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
    
    const cartProduct = {
      ...product,
      quantity: 1
    }
    setCart([...cart, cartProduct])
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

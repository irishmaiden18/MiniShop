import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import ProductListContext from './context/ProductListContext'
import Home from './components/Home'
import Cart from './components/Cart'
import { useState } from 'react'

function App() {
  
  const [productList, setProductList] = useState(null)

  return (
    <ProductListContext value={{
      productList: productList,
      setProductList: setProductList
    }}>
      <h1>MiniShop</h1>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </ProductListContext>
  )
}

export default App

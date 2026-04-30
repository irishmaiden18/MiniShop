import { useContext, useEffect, useState } from "react"
import MiniProductCard from "./MiniProductCard"
import ProductListContext from "../context/ProductListContext"

const Home = () => {

    const {productList} = useContext(ProductListContext)

    const [filterBy, setFilterBy] = useState("")

    const filterProducts = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.category.slug === filteredBy
        })
        return filteredProducts
    }

    const filteredProducts = () => {
        if (filterBy === "electronics") {
            return filterProducts("electronics")
        } else if (filterBy === "furniture") {
            console.log("furniture")
            return filterProducts("furniture")
        } else {
            return productList
        }
    }

    let filteredProductList = filteredProducts()

    return (
        <>
            <h2>Home</h2>
            <button onClick={() => setFilterBy("electronics")}>Electronics</button>
            <button onClick={() => setFilterBy("furniture")}>Furniture</button>
            <button onClick={() => setFilterBy("")}>All Products</button>
            <ul>
                {filteredProductList ? (
                    filteredProductList.map((product) => (
                        <li key={product.id}>
                            <MiniProductCard product={product}/>
                        </li>
                    ))
                ) : (
                    <h2>No Data</h2>
                )}
            </ul>
        </>
    )
}

export default Home
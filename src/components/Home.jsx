import { useContext, useEffect, useState } from "react"
import MiniProductCard from "./MiniProductCard"
import ProductListContext from "../context/ProductListContext"

const Home = () => {

    const {productList} = useContext(ProductListContext)

    return (
        <>
            <h2>Home</h2>
            <ul>
                {productList ? (
                    productList.map((product) => (
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
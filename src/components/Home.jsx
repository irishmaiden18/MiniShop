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
                            <MiniProductCard image={product.images[0]} title={product.title} price={product.price} id={product.id}/>
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
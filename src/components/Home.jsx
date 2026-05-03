import { useContext, useEffect, useState } from "react"
import MiniProductCard from "./MiniProductCard"
import ProductListContext from "../context/ProductListContext"

const Home = () => {

    const {productList} = useContext(ProductListContext)

    const [filterBy, setFilterBy] = useState("")

    const [search, setSearch] = useState("")

    const [electronicsSelect, setElectronicsSelect] = useState("")

    const [isElectronicsOpen, setIsElectronicsOpen] = useState("")

    const filterProducts = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.category.slug === filteredBy
        })
        return filteredProducts
    }

    const filteredProducts = () => {
        // if (filterBy === "electronics") {
        //     return filterProducts("electronics")

        // } 
        if (electronicsSelect === "all") {
            const electronics = filterProducts("electronics")
            const other = filterProducts("updated-category-name")
            // return filterProducts("electronics")
            return [...electronics, ...other]
        } else if (electronicsSelect === "laptops") {
            const filteredProducts = productList.filter((product) => {
                return product.title.toLowerCase().includes("laptop")
            })
            return filteredProducts
        } else if (electronicsSelect === "headphones") {
            const filteredProducts = productList.filter((product) => {
                return product.title.toLowerCase().includes("headphones")
            })
            return filteredProducts
        }
        else if (filterBy === "furniture") {
            const furniture = filterProducts("furniture")
            const love = filterProducts("love-is-light")
            return [...furniture, ...love]

        } else if (filterBy === "clothes") {
            return filterProducts("clothes")

        } else if (filterBy === "miscellaneous") {
            return filterProducts("miscellaneous")
        
        } else if (search !== "") {
            const filteredProducts = productList.filter((product) => {
                return product.title.toLowerCase().includes(search)
            })
            return filteredProducts
            
        } else {
            return productList
        }
    }

    let filteredProductList = filteredProducts()
    console.log(productList)

    return (
        <>
            <h2>Home</h2>
            <div>
                <label>Search</label>
                <input 
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            <button onClick={() => setFilterBy("electronics")}>Electronics</button>
            <select 
                name="electronics"
                value={electronicsSelect}
                onChange={(event) => {setElectronicsSelect(event.target.value)}}
                >
                    <option value="">Select an option</option>
                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="headphones">Headphones</option>
                    <option value="phones">Phones</option>
                    <option value="other">Other</option>
            </select>
            <button onClick={() => setFilterBy("furniture")}>Furniture</button>
            <button onClick={() => setFilterBy("clothes")}>Clothing</button>
            <button onClick={() => setFilterBy("miscellaneous")}>Misc</button>
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
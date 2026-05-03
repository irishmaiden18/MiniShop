import { useContext, useEffect, useState } from "react"
import MiniProductCard from "./MiniProductCard"
import ProductListContext from "../context/ProductListContext"

const Home = () => {

    const {productList} = useContext(ProductListContext)

    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")

    const [isElectronicsOpen, setIsElectronicsOpen] = useState(false)
    const [isFurnitureOpen, setIsFurnitureOpen] = useState(false)
    const [isClothingOpen, setIsClothingOpen] = useState(false)

    const toggleElectronicsDropdown = () => {
        setIsElectronicsOpen(!isElectronicsOpen)
        setIsFurnitureOpen(false)
        setIsClothingOpen(false)
    }

    useEffect(() => {
        if (isElectronicsOpen) {
            setFilterBy("all-electronics")
        } else {
            setFilterBy("")
        }
    }, [isElectronicsOpen])

    const toggleFurnitureDropdown = () => {
        setIsFurnitureOpen(!isFurnitureOpen)
        setIsElectronicsOpen(false)
        setIsClothingOpen(false)
    }

    useEffect(() => {
        if (isFurnitureOpen) {
            setFilterBy("all-furniture")
        } else {
            setFilterBy("")
        }
    }, [isFurnitureOpen])
    
    const toggleClothingDropdown = () => {
        setIsClothingOpen(!isClothingOpen)
        setIsElectronicsOpen(false)
        setIsFurnitureOpen(false)
    }

    useEffect(() => {
        if (isClothingOpen) {
            setFilterBy("all-clothing")
        } else {
            setFilterBy("")
        }
    }, [setIsClothingOpen])

    const filterProducts = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.category.slug === filteredBy
        })
        return filteredProducts
    }

    const filterProductsTitle = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.title.toLowerCase().includes(filteredBy)
        })
        return filteredProducts
    }

    useEffect(() => {
        setSearch("")
    }, [filterBy])

    useEffect(() => {
        setFilterBy("")
    }, [search])

    const filteredProducts = () => {
        console.log(filterBy)
        if (filterBy === "all-electronics") {
            const electronics = filterProducts("electronics")
            const other = filterProducts("updated-category-name")
            return [...electronics, ...other]

        } else if (filterBy === "laptops") {
            return filterProductsTitle("laptop")

        } else if (filterBy === "headphones") {
            return filterProductsTitle("headphones")
        
        } else if (filterBy === "phones") {
            return filterProductsTitle(" phone")

        } else if (filterBy === "other-electronics") {
            const electronics = filterProducts("electronics")
            const other = filterProducts("updated-category-name")
            const targets = ["laptop", "headphone", " phone"]
            const filteredProducts = [...electronics, ...other].filter((product) => {
                return !targets.some(target => product.title.toLowerCase().includes(target))
            })
            return filteredProducts
        }


        else if (filterBy === "all-furniture") {
            const furniture = filterProducts("furniture")
            const love = filterProducts("love-is-light")
            return [...furniture, ...love]
        
        } else if (filterBy === "chairs") {
            return filterProductsTitle("chair")

        } else if (filterBy === "tables") {
            return filterProductsTitle("table")
        
        } else if (filterBy === "couches") {
            const sofas = filterProductsTitle("sofa")
            const couches = filterProductsTitle("couch")
            return [...sofas, ...couches]

        } else if (filterBy === "other-furniture") {
            const furniture = filterProducts("furniture")
            const love = filterProducts("love-is-light")
            const targets = ["chair", "table", "sofa"]
            const filteredProducts = [...furniture, ...love].filter((product) => {
                return !targets.some(target => product.title.toLowerCase().includes(target))
            })
            return filteredProducts
        }


        else if (filterBy === "all-clothing") {
            return filterProducts("clothes")

        } else if (filterBy === "hoodie") {
            const hoodies = filterProductsTitle("hoodie")
            const sweatshirts = filterProductsTitle("hooded")
            return [...hoodies, ...sweatshirts]

        } else if (filterBy === "hat") {
            return filterProductsTitle("cap")

        } else if (filterBy === "t-shirt") {
            const tS = filterProductsTitle("t-shirt")
            const tees = filterProductsTitle("tee")
            return [...tS, ...tees]

        } else if (filterBy === "other-clothing") {
            const clothes = filterProducts("clothes")
            const targets = ["hoodie", "hooded", "tee", "cap", "t-shirt"]
            const filteredProducts = clothes.filter((product) => {
                return !targets.some(target => product.title.toLowerCase().includes(target))
            })
            return filteredProducts
        }
        
        
        else if (filterBy === "miscellaneous") {
            return filterProducts("miscellaneous")
        
        } else if (search !== "") {
            return filterProductsTitle(search)
            
        } else {
            return productList
        }
    }

    let filteredProductList = filteredProducts()
    console.log(filteredProductList)
    // console.log(productList)

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
            
            <div>
                <button onClick={toggleElectronicsDropdown}>Electronics</button>
                <button onClick={toggleFurnitureDropdown}>Furniture</button>
                <button onClick={toggleClothingDropdown}>Clothing</button>
                <button onClick={() => setFilterBy("miscellaneous")}>Misc</button>
                <button onClick={() => setFilterBy("")}>All Products</button>
            </div>
            <div>
                {isElectronicsOpen && (
                    <select
                        name="electronics"
                        value={filterBy}
                        onChange={(event) => {setFilterBy(event.target.value)}}
                    >
                        <option value="all-electronics">All</option>
                        <option value="laptops">Laptops</option>
                        <option value="headphones">Headphones</option>
                        <option value="phones">Phones</option>
                        <option value="other-electronics">Other</option>
                    </select>
                )}
                {isFurnitureOpen && (
                    <select
                        name="furniture"
                        value={filterBy}
                        onChange={(event) => {setFilterBy(event.target.value)}}
                    >
                        <option value="all-furniture">All</option>
                        <option value="chairs">Chairs</option>
                        <option value="tables">Tables</option>
                        <option value="couches">Couches</option>
                        <option value="other-furniture">Other</option>
                    </select>
                )}
                {isClothingOpen && (
                    <select
                        name="clothing"
                        value={filterBy}
                        onChange={(event) => {setFilterBy(event.target.value)}}
                    >
                        <option value="all-clothing">All</option>
                        <option value="hoodie">Hoodies</option>
                        <option value="hat">Hats</option>
                        <option value="t-shirt">T-Shirts</option>
                        <option value="other-clothing">Other</option>
                    </select>
                )}
            </div>
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
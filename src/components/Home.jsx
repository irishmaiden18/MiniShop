import { useContext, useEffect, useState } from "react"
import MiniProductCard from "./MiniProductCard"
import ProductListContext from "../context/ProductListContext"

const Home = () => {

    const {productList} = useContext(ProductListContext)

    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")

    const [isGroceriesOpen, setIsGroceriesOpen] = useState(false)
    const [isClothingOpen, setIsClothingOpen] = useState(false)

    const toggleGroceriesDropdown = () => {
        setIsGroceriesOpen(!isGroceriesOpen)
        setIsClothingOpen(false)
    }
    
    const toggleClothingDropdown = () => {
        setIsClothingOpen(!isClothingOpen)
        setIsGroceriesOpen(false)
    }

    const handleHomeDecorButton = () => {
        setFilterBy("home-decoration")
        setIsGroceriesOpen(false)
        setIsClothingOpen(false)
    }

    const handleBeautyButton = () => {
        setFilterBy("beauty")
        setIsGroceriesOpen(false)
        setIsClothingOpen(false)
    }

    const handleKitchenAccessoryButton = () => {
        setFilterBy("kitchen-accessories")
        setIsGroceriesOpen(false)
        setIsClothingOpen(false)
    }

    const handleAllButton = () => {
        setFilterBy("")
        setIsGroceriesOpen(false)
        setIsClothingOpen(false)
    }

    useEffect(() => {
        if (isClothingOpen) {
            setFilterBy("all-clothing")
        } else if (isGroceriesOpen) {
            setFilterBy("all-groceries")
        } else {
            setFilterBy("")
        }
    }, [isClothingOpen, isGroceriesOpen])

    const filterProducts = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.category === filteredBy
        })
        return filteredProducts
    }

    const filterProductsTitle = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.title.toLowerCase().includes(filteredBy)
        })
        return filteredProducts
    }

    const filterProductsTag = (filteredBy) => {
        const filteredProducts = productList.filter((product) => {
            return product.tags.includes(filteredBy)
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

        if (filterBy === "all-groceries") {
            const groceries = filterProducts("groceries")
            return groceries

        } else if (filterBy === "pet supplies") {
            return filterProductsTag("pet supplies")

        } else if (filterBy === "fruits") {
            return filterProductsTag("fruits")
        
        } else if (filterBy === "vegetables") {
            return filterProductsTag("vegetables")

        } else if (filterBy === "meat") {
            return filterProductsTag("meat")

        } else if (filterBy === "other-groceries") {
            const groceries = filterProducts("groceries")
            const targets = ["pet supplies", "fruits", "vegetables", "meat"]
            const filteredProducts = groceries.filter((product) => {
                return !targets.some(target => product.tags.includes(target))
            })
            return filteredProducts
        }

        else if (filterBy === "beauty") {
            return filterProducts("beauty")
        } 
        
        else if (filterBy === "all-clothing") {
            const clothing = filterProductsTag("clothing")
            const footwear = filterProductsTag("footwear")
            const watches = filterProductsTag("watches")
            return [...clothing, ...footwear, ...watches]
        
        } else if (filterBy === "mens-shirts") {
            const mensShirts = filterProducts("mens-shirts")
            return mensShirts
        
        } else if (filterBy === "footwear") {
            return filterProductsTag("footwear")

        } else if (filterBy === "watches") {
            const watches = filterProductsTag("watches")
            return watches

        } else if (filterBy === "other-clothing") {
            const clothing = filterProductsTag("clothing")
            const footwear = filterProductsTag("footwear")
            const watches = filterProductsTag("watches")
            const targets = ["men's shirts", "men's t-shirts", "footwear", "watches"]
            const filteredProducts = [...clothing, ...footwear, ...watches].filter((product) => {
                return !targets.some(target => product.tags.includes(target))
            })
            return filteredProducts
        }
        
        else if (filterBy === "home-decoration") {
            return filterProducts("home-decoration")
        } 

        else if (filterBy === "kitchen-accessories") {
            return filterProducts("kitchen-accessories")
        }

        else if (search !== "") {
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
                <button onClick={toggleGroceriesDropdown}>Groceries</button>
                <button onClick={handleKitchenAccessoryButton}>Kitchen Accessories</button>
                <button onClick={handleBeautyButton}>Beauty</button>
                <button onClick={toggleClothingDropdown}>Clothing</button>
                <button onClick={handleHomeDecorButton}>Home Decoration</button>
                <button onClick={handleAllButton}>All Products</button>
            </div>
            <div>
                {isGroceriesOpen && (
                    <select
                        name="groceries"
                        value={filterBy}
                        onChange={(event) => {setFilterBy(event.target.value)}}
                    >
                        <option value="all-groceries">All</option>
                        <option value="pet supplies">Pet Supplies</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="meat">Meat</option>
                        <option value="other-groceries">Other</option>
                    </select>
                )}
    
                {isClothingOpen && (
                    <select
                        name="clothing"
                        value={filterBy}
                        onChange={(event) => {setFilterBy(event.target.value)}}
                    >
                        <option value="all-clothing">All</option>
                        <option value="mens-shirts">Men's Shirts</option>
                        <option value="footwear">Footwear</option>
                        <option value="watches">Watches</option>
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
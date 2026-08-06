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
    // console.log(filteredProductList)
    // console.log(productList)

    const normalColor = "bg-[#01796F] hover:bg-[#004D46]"
    
    // /30 means at 30% opacity
    const activeColor = "!bg-[#004D46] ring-4 ring-[#01796F]/30"

    return (
        <>
            {/* <h2>Home</h2> */}
            <div className="flex justify-center items-center w-full mb-4">
                <label className="bg-[#01796F] text-white p-3 my-4 inline-block rounded-l-xl">Search</label>
                <input 
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="bg-[#FAF0E6] text-black p-3 w-[80%] rounded-r-xl"
                />
            </div>
            
            <div className="grid grid-cols-3 lg:flex lg:justify-around lg:items-center gap-6 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-8 w-[80%] lg:w-[96%] mx-auto">
                <button onClick={toggleGroceriesDropdown} className={`bg-[#01796F] text-white w-full md:flex-1 text-center leading-tight h-14 sm:h-11 rounded-xl px-1 ${isGroceriesOpen ? activeColor : normalColor}`}>Groceries</button>
                <button onClick={handleKitchenAccessoryButton} className={`bg-[#01796F] text-white w-full md:flex-1 text-center leading-tight h-14 sm:h-11 rounded-xl px-1 hover:bg-[#004D46]`}>Kitchen Accessories</button>
                <button onClick={handleBeautyButton} className={`bg-[#01796F] text-white w-full md:flex-1 text-center leading-tight h-14 sm:h-11 rounded-xl px-1 hover:bg-[#004D46]`}>Beauty</button>
                <button onClick={toggleClothingDropdown} className={`bg-[#01796F] text-white w-full md:flex-1 text-center leading-tight h-14 sm:h-11 rounded-xl px-1 ${isClothingOpen ? activeColor : normalColor}`}>Clothing</button>
                <button onClick={handleHomeDecorButton} className={`bg-[#01796F] text-white w-full md:flex-1 text-center leading-tight h-14 sm:h-11 rounded-xl px-1 hover:bg-[#004D46]`}>Home Decoration</button>
                <button onClick={handleAllButton} className={`bg-[#01796F] text-white w-full md:flex-1 text-center leading-tight h-14 sm:h-11 rounded-xl px-1 hover:bg-[#004D46]`}>All Products</button>
            </div>
            <div className="flex justify-start items-center w-[50%] bg-[#FAF0E6] text-black mx-auto mt-4">
                {isGroceriesOpen && (
                    <select
                        name="groceries"
                        value={filterBy}
                        onChange={(event) => {setFilterBy(event.target.value)}}
                        className="w-full bg-[#FAF0E6] text-black"
                        
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
                        className="w-full bg-[#FAF0E6] text-black"
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
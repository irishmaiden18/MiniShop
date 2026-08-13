import { useContext, useState, useRef } from "react"
import ProductListContext from "../context/ProductListContext"
import StarRating from "./StarRating"

const AddProduct = () => {

    const {addProduct} = useContext(ProductListContext)

    const defaultForm = {
        id: "",
        title: "",
        category: {
            slug: ""
        },
        customerRating: 0,
        description: "",
        images: [],
        price: 0,
        customerReviews: []
    }

    const [formData, setFormData] = useState(defaultForm)

    // const [showBanner, setShowBanner] = useState(false)

    const [fileName, setFileName] = useState("No file chosen")
    const fileInputRef = useRef(null)

    const handleChange = (event) => {

        const {name, value} = event.target

        if (name === "images") {
            const updatedFormData = {
                ...formData,
                images: [URL.createObjectURL(event.target.files[0])]
            }
            setFormData(updatedFormData)
        } else {
            const updatedFormData = {
                ...formData,
                [name]: value
            }
            setFormData(updatedFormData)
        }
    }

    const handleSubmit = (event) => {
        
        event.preventDefault()
        
        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
        // const numReviews = Math.floor(Math.random() * 3)

        // const generateCustomerReviews = () => {
        //     let customerReviews = []
        //     for (let i = 0; i < numReviews; i++) {
        //         const randomText = Math.floor(Math.random() * 203) + 10
        //         const review = string.slice(0, randomText)
        //         customerReviews.push(review)
        //     }
        //     return customerReviews
        // }
        const randomTextLength = Math.floor(Math.random() * 203) + 10


        const newProduct = {
            id: Date.now(),
            title: formData.title,
            category: {
                slug: formData.category,
            },
            // customerRating: formData.customerRating || (Math.random() * 5).toFixed(1),
            customerRating: 0,
            description: formData.description || string.slice(0, randomTextLength),
            images: [formData.images],
            price: formData.price,
            customerReviews: []
        }

        addProduct(newProduct)

        setFormData(defaultForm)
        setFileName("No file chosen")

        // setShowBanner(true)

        // // hide banner div automatically after 3 seconds
        // setTimeout(() => {
        //     setShowBanner(false)
        // }, 3000)
        
    }

    const handleFileChange = (e) => {
        // run existing form handler so backend state updates
        handleChange(e)
        
        // capture the name of the file if one was picked
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name)
        } else {
            setFileName("No file chosen")
        }
    }

    // trigger a click in the hidden native file selector
    const handleImageButtonClick = () => {
        // fileInputRef points to the native file chooser
        // current refers to the curent thing stored at fileInputRef
        // click clicks the hidden element
        fileInputRef.current.click() 
    }

    return (
        <>
            <h2 className="text-center text-4xl pt-8 pb-12">Add A New Product</h2>
            <form onSubmit={handleSubmit} className="w-[90%] lg:w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-8 lg:gap-20">
                    {/* form */}
                    <div className="flex flex-col gap-4 lg:gap-6 lg:col-span-7 w-full">
                        <div className="flex items-center">
                            <label className="bg-[#01796F] text-white p-3 w-32 shrink-0 flex justify-center rounded-l-xl">Product Title</label>
                            <input 
                                type="text"
                                name="title"
                                value={formData.title}   
                                onChange={handleChange}
                                className="bg-[#FAF0E6] text-black p-3 flex-1 rounded-r-xl"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="bg-[#01796F] text-white p-3 w-32 shrink-0 flex justify-center rounded-l-xl">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="bg-[#FAF0E6] text-black py-3 px-4 flex-1 rounded-r-xl"
                            >
                                <option value="">Select a category</option>
                                <option value="groceries">Groceries</option>
                                <option value="kitchen-accessories">Kitchen Accessories</option>
                                <option value="beauty">Beauty</option>
                                <option value="clothing">Clothing</option>
                                <option value="home-decoration">Home Decoration</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="bg-[#01796F] text-white p-3 w-32 shrink-0 flex justify-center rounded-l-xl">Price</label>
                            {/* step allows decimal values */}
                            <input 
                                type="number" 
                                step="any"
                                min={0}
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="bg-[#FAF0E6] text-black py-3 px-4 flex-1 rounded-r-xl"
                            />
                        </div>
                        <div className="flex items-stretch"> 
                            <label className="bg-[#01796F] text-white p-3 w-32 shrink-0 flex items-center justify-center rounded-l-xl">
                                Image
                            </label>
                            <div className="bg-[#FAF0E6] p-3 flex-1 rounded-r-xl flex flex-row items-center">
                                
                                {/* native file chooser, completely hidden */}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    name="images" 
                                    ref={fileInputRef}
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />

                                {/* styled button */}
                                <button 
                                    type="button"
                                    onClick={handleImageButtonClick}
                                    className="bg-[#01796F] text-white rounded-xl ml-3 px-4 py-1 shrink-0"
                                >
                                    Choose File
                                </button>

                                {/* file name or no file chosen */}
                                <span className="flex-1 text-center block">
                                    {fileName}
                                </span>

                            </div>
                        </div>
                        <div className="relative">
                            <label className="absolute top-0 left-0 bg-[#01796F] text-white p-3 w-32 shrink-0 flex justify-center rounded-l-xl z-10">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-[#FAF0E6] text-black p-3 pt-14 w-full rounded-xl min-h-40 lg:min-h-72 block"
                            ></textarea>
                        </div>
                    </div>
                    {/* preview */}
                    <div className="pb-2 md:pb-10 lg:pb-4 lg:col-span-5 w-full lg:mx-auto">
                        <h3 className="text-center text-2xl py-8 lg:pt-0">Preview</h3>
                        <div className="bg-[#FAF0E6] w-full flex flex-col items-center lg:h-full rounded-xl overflow-hidden">
                            <div className="bg-white w-full">
                                <img src={formData.images.length > 0 ? formData.images[0] : "/blankImage.jpg"} alt={`${formData.title || "Product Title"} pic`} className="bg-white w-full h-auto block"/>
                            </div>
                            <div className="p-4 flex flex-col lg:flex-1 w-full">
                                <h2 className="text-center py-4 text-xl lg:flex-1 flex items-center justify-center">{formData.title || "Product Title"}</h2>
                                <div className="flex justify-center pb-4">
                                    <StarRating rating={formData.customerRating || 3.5}/>
                                </div>
                                <p className="text-center pb-4 text-lg">${Number(formData.price || 0).toFixed(2)}</p>
                                <div className="w-full mt-auto">
                                    <button className={`bg-[#01796F] text-white text-center leading-tight rounded-xl px-6 py-2 hover:bg-[#004D46] hover:ring-4 hover:ring-[#01796F]/30 block mx-auto`}>Add to Cart</button>
                                    <div className="flex justify-end w-full">
                                        <button className="p-4 mr-4">More Info...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* add product button */}
                    <div className="lg:col-span-full flex justify-center items-center md:pt-0 pt-8 pb-6">
                        <button className="bg-[#01796F] text-white text-center w-fit rounded-xl py-3 px-8 hover:bg-[#004D46] hover:ring-4 hover:ring-[#01796F]/30">Add Product</button>
                    </div>
                </div>
            </form>
            {/* {showBanner && (
            <div className="bg-green-600 text-white">
                <p>Product successfully added!</p>
            </div>
            )} */}
        </>
    )
}

export default AddProduct
import { useContext, useState } from "react"
import ProductListContext from "../context/ProductListContext"

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

    const handleChange = (event) => {

        const {name, value} = event.target

        const updatedFormData = {
            ...formData,
            [name]: value
        }
        setFormData(updatedFormData)
    }

    const handleSubmit = (event) => {
        
        event.preventDefault()

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
        const numReviews = Math.floor(Math.random() * 3)
        let customerReviews = []
        for (let i = 0; i < numReviews; i++) {
            const randomText = Math.floor(Math.random() * 203) + 10
            const review = string.slice(0, randomText)
            customerReviews.push(review)
        }
        const randomTextLength = Math.floor(Math.random() * 203) + 10


        const newProduct = {
            id: Date.now(),
            title: formData.title,
            category: {
                slug: formData.category,
            },
            customerRating: formData.customerRating || (Math.random() * 5).toFixed(1),
            description: formData.description || string.slice(0, randomTextLength),
            images: [formData.images],
            price: formData.price,
            customerReviews: customerReviews
        }
        console.log(newProduct)

        addProduct(newProduct)

        setFormData(defaultForm)
    }

  return (
    <>
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product Title: </label>
                <input 
                    type="text"
                    name="title"
                    value={formData.title}   
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Category: </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                </select>
            </div>
            <div>
                <label>Customer Rating: </label>
                <input 
                    type="number" 
                    min={1} 
                    max={5}
                    name="customerRating"
                    value={formData.customerRating}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description: </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label>Image URL: </label>
                <input 
                    type="text"
                    name="images"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price: </label>
                <input 
                    type="number" 
                    min={0}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <button>Add Product</button>
        </form>
    </>
  )
}

export default AddProduct
import { useContext, useState } from "react"
import CartContext from "../context/CartContext"
import Modal from "./Modal"


const MiniProductCard = ({product, quantity}) => {

    const {addToCart, increaseCartQuantity, decreaseCartQuantity} = useContext(CartContext)

    const [isModalOpen, setIsModalOpen] = useState(false)
    // console.log(product)
    return (
        <>
            <div>
                <img src={product.images[0]} alt={`${product.title} pic`} width={250} />
                <h2>{product.title}</h2>
                <p>${product.price}</p>
                <button onClick={() => setIsModalOpen(true)}>More Info</button>
                {quantity ? 
                    <p>
                        Quantity: <button onClick={() => decreaseCartQuantity(product.id)}>-</button>{quantity}<button onClick={() => increaseCartQuantity(product.id)}>+</button>
                    </p> 
                    : 
                    <button onClick={() => addToCart(product.id)}>Add to Cart</button>}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h1>Info</h1>
                <img src={product.images[0]} alt={`${product.title} pic`} width={250} />
                <h2>{product.title}</h2>
                <p>${product.price}</p>
                <p>Customer Rating: {product.rating}</p>
                <p>{product.description}</p>
                <h4>Customer Reviews:</h4>
                <ul>
                    {(product.reviews && product.reviews.length > 0) ? (product.reviews.map((review, index) => (
                        <li key={index}>
                            <p>Rating: {review.rating}</p>
                            <p>Review: {review.comment}</p>
                            <p>Date Posted: {review.date}</p>
                            <p>Posted By: {review.reviewerName}</p>
                        </li>
                    )))
                    : "There are no customer reviews for this product"
                    }
                </ul>
            </Modal>
        </>
    )
}

export default MiniProductCard
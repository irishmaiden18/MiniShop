import { useContext, useState } from "react"
import CartContext from "../context/CartContext"
import Modal from "./Modal"


const MiniProductCard = ({product, quantity}) => {

    const {addToCart, increaseCartQuantity, decreaseCartQuantity} = useContext(CartContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div>
                <img src={product.images[0]} alt={`${product.title} pic`} width={250} />
                <h2>{product.title}</h2>
                <p>${product.price}.00</p>
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
                <p>${product.price}.00</p>
                <p>Customer Rating: {product.customerRating}</p>
                <p>{product.description}</p>
                <h4>Customer Reviews: </h4>
                <ul>
                    {product.customerReviews.map((review) => (
                        <li>{review}</li>
                    ))}
                </ul>
            </Modal>
        </>
    )
}

export default MiniProductCard
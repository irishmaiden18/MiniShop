import { useContext, useState } from "react"
import CartContext from "../context/CartContext"
import Modal from "./Modal"


const MiniProductCard = ({product, quantity}) => {

    const {addToCart, increaseCartQuantity, decreaseCartQuantity} = useContext(CartContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    // console.log(product)
    return (
        <>
            <div className="bg-[#FAF0E6] w-full h-full mx-auto rounded-xl overflow-hidden flex flex-col">
                <div className="bg-white">
                    <img src={product.images[0]} alt={`${product.title} pic`} className="w-[80%] mx-auto bg-white"/>
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-center py-4 text-xl flex-1 flex items-center justify-center">{product.title}</h2>
                    <p className="text-center pb-4 text-lg">${product.price}</p>
                    <div className="mt-auto">
                        {quantity ? 
                            <div className="flex justify-center">
                                <button onClick={() => decreaseCartQuantity(product.id)} className="bg-[#01796F] text-white text-center w-8 h-9 rounded-xl mx-2 text-xl">-</button>{quantity}<button onClick={() => increaseCartQuantity(product.id)} className="bg-[#01796F] text-white text-center w-8 h-9 rounded-xl mx-2">+</button>
                            </div> 
                            : (
                                <button 
                                    onClick={() => addToCart(product.id)}
                                    className={`bg-[#01796F] text-white text-center leading-tight rounded-xl px-6 py-2 hover:bg-[#004D46] hover:ring-4 hover:ring-[#01796F]/30 block mx-auto`}
                                >
                                    Add to Cart
                                </button>
                            )
                        }
                        <div className="flex justify-end">
                            <button onClick={() => setIsModalOpen(true)} className="p-4 mr-4">More Info...</button>
                        </div>
                    </div>
                </div>
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
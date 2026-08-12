import { useContext, useState } from "react"
import CartContext from "../context/CartContext"
import Modal from "./Modal"
import StarRating from "./StarRating"


const MiniProductCard = ({product, quantity}) => {

    const {addToCart, increaseCartQuantity, decreaseCartQuantity} = useContext(CartContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    // console.log(product)
    return (
        <>
            <div className="bg-[#FAF0E6] w-full h-full mx-auto rounded-xl overflow-hidden flex flex-col">
                <div className="bg-white">
                    <img src={product.images[0]} alt={`${product.title} pic`} className="bg-white"/>
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-center py-4 text-xl flex-1 flex items-center justify-center">{product.title}</h2>
                    <div className="flex justify-center pb-4">
                        <StarRating rating={product.rating}/>
                    </div>
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
                {/* <h1>Info</h1> */}
                <div className="bg-[rgb(250,240,230)] px-8 pb-8">
                    <h2 className="text-2xl text-center py-4 text-[#01796F]">{product.title}</h2>
                    <img src={product.images[0]} alt={`${product.title} pic`} className="w-[75%] bg-white mx-auto" />
                    <div className="text-center">
                        <p className="text-[#01796F] py-6 font-bold">${product.price}</p>
                        {/* <p className="pb-2"><span className="text-[#01796F]">Customer Rating:</span> {product.rating}</p> */}
                        <StarRating rating={product.rating}/>
                    </div>
                    <p className="py-6"><span className="text-[#01796F]">Description:</span> {product.description}</p>
                    <h4 className="text-[#01796F] pb-4">Customer Reviews</h4>
                    <ul className="pb-4">
                        {/* list-disc pl-5 marker:text-[#01796F] */}
                        {(product.reviews && product.reviews.length > 0) ? (product.reviews.map((review, index) => (
                            <li key={index} className="pb-4 pl-4">
                                {/* <p><span className="text-[#01796F]">Rating:</span> {review.rating}</p> */}
                                <StarRating rating={review.rating} />
                                <p><span className="text-[#01796F]">Review:</span> {review.comment}</p>
                                <p>
                                    <span className="text-[#01796F]">Date Posted:</span>
                                    {' '}
                                    {new Date (review.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p><span className="text-[#01796F]">Posted By:</span> {review.reviewerName}</p>
                            </li>
                        )))
                        : "There are no customer reviews for this product"
                        }
                    </ul>
                    <button 
                        onClick={() => addToCart(product.id)}
                        className={`bg-[#01796F] text-white text-center leading-tight rounded-xl px-6 py-2 hover:bg-[#004D46] hover:ring-4 hover:ring-[#01796F]/30 block mx-auto`}
                    >
                        Add to Cart
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default MiniProductCard
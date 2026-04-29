import { useContext } from "react"
import CartContext from "../context/CartContext"
import { Navigate } from "react-router"


const MiniProductCard = ({image, title, price, id, quantity}) => {

    const {addToCart, increaseCartQuantity, decreaseCartQuantity} = useContext(CartContext)

    const navigate = useNavigate()

    const handleClick = (id) => {
        addToCart(id)
        navigate("/cart")
    }

    return (
        <>
            <div>
                <img src={image} alt={`${title} pic`} width={250} />
                <h2>{title}</h2>
                <p>${price}.00</p>
                {quantity ? 
                    <p>
                        Quantity: <button onClick={() => decreaseCartQuantity(id)}>-</button>{quantity}<button onClick={() => increaseCartQuantity(id)}>+</button>
                    </p> 
                    : 
                    <button onClick={() => handleClick(id)}>Add to Cart</button>}
            </div>
        </>
    )
}

export default MiniProductCard
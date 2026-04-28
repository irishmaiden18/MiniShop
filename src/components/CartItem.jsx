import ProductCard from "./ProductCard"

const CartItem = () => {
  return (
    <>
        <h2>Cart Item</h2>
        <div>
            <ProductCard/>
            <p>{quantity}</p>
        </div>
    </>
  )
}

export default CartItem
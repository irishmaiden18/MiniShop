
const ProductCard = () => {
  return (
    <>
        <h2>Product Card</h2>
        <div>
            <img src={image} alt={`${name} pic`}/>
            <h3>{title}</h3>
            <p>{price}</p>
            <p>{description}</p>
            <button>Add to Cart</button>
        </div>
    </>
  )
}

export default ProductCard
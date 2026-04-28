const MiniProductCard = () => {
  return (
    <>
        <h2>Mini-Product Card</h2>
        <div>
            <img src={image} alt={`${name} pic`}/>
            <h3>{title}</h3>
            <p>{price}</p>
            <button>Add to Cart</button>
        </div>
    </>
  )
}

export default MiniProductCard
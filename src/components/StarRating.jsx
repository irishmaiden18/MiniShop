


const StarRating = ({ rating = 0 }) => {

    // make sure the rating stays between 0 and 5
    const validatedRating = Math.min(5, Math.max(0, rating))

    // calculate the horizontal width percentage (the amount of stars to fill)
    const fillPercentage = (validatedRating/5) * 100

    // reusable raw SVG star shape path template
    const StarIcon = () => (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    )

    return (
        <>
            <div className="relative inline-block select-none" aria-label={`Rating: ${validatedRating} out of 5 stars`}>
                {/* 5 empty grey stars */}
                <div className="flex text-gray-300">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                {/* top layer: colored filled in stars */}
                <div className="absolute top-0 left-0 h-full flex text-[#01796F] overflow-hidden whitespace-nowrap pointer-events-none" style={{width: `${fillPercentage}%`}}>
                    {[...Array(5)].map((_,i) => <StarIcon key={i} />)}
                </div>
            </div>
        </>
  )
}

export default StarRating
const StarRating = ({ rating = 0 }) => {

    // make sure the rating stays between 0 and 5, by taking the max of 0 or the rating, which will always be the rating unless it is zero or invalid, and then taking the minimum of 5 and the rating which again is always the rating unless it is invalid
    const validatedRating = Math.min(5, Math.max(0, rating))

    // calculate the horizontal width percentage (how much of the container of filled in stars to show)
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
                    {/* [...Array(5)] creates a new array of 5 undefined values */}
                    {/* .map((_, i) =>)loops through the 5 undefined values and considers the undefined value(_) and the index */}
                    {/* for each element of the array, print a star -- the color on the div makes it gray */}
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                {/* top layer: colored filled in stars */}
                {/* creates 5 filled in stars, then shortens the container to the right percentage of what should be filled in, overflow-hidden hides everything outside the shortened container and whitespace-nowrap keeps the stars from going to multiple lines when the container is shortened, it forces the stars to stay on one line */}
                {/* style={{width: `${fillPercentage}%`} tells browser how much of the container to display cutting off some of the rendered green colored stars, simulating a partially filled star rating */}
                <div className="absolute top-0 left-0 h-full flex text-[#01796F] overflow-hidden whitespace-nowrap pointer-events-none" style={{width: `${fillPercentage}%`}}>
                    {/* [...Array(5)] creates a new array of 5 undefined values */}
                    {/* .map((_, i) =>) loops through the 5 undefined values and considers the undefined value(_) and the index */}
                    {/* for each element of the array, print a star -- the color in the div makes them green */}
                    {[...Array(5)].map((_,i) => <StarIcon key={i} />)}
                </div>
            </div>
        </>
  )
}

export default StarRating
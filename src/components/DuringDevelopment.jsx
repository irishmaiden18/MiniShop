
const DuringDevelopment = () => {
    return(
        <>
            <div className="block sm:hidden text-2xl">XS</div>
            <div className="hidden sm:block md:hidden text-2xl">S</div>
            <div className="hidden md:block lg:hidden text-2xl">M</div>
            <div className="hidden lg:block xl:hidden text-2xl">L</div>
            <div className="hidden xl:block 2xl:hidden text-2xl">XL</div>
            <div className="hidden 2xl:block text-2xl">XXL</div>
            {/* Note: remove bootstrap immport from main.jsx, this file and uninstiall bootstrap with "npm uninstall bootstrap" */}
        </>
    )
}

export default DuringDevelopment
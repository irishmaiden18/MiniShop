const Footer = () => {
  return (
    <div className="bg-[#01796F] text-white mt-8 p-4 flex flex-col md:flex-row items-center md:justify-between">
        {/* keeps the centered paragraph perfectly balanced on desktop by taking up space */}
        <div className="hidden md:block md:flex-1"></div>
        <p className="pb-2 md:pb-0 md:flex-1 md:text-center">Copyright © MiniShop</p>
        <p className="md:pb-0 md:flex-1 md:text-right">August 2026</p>
    </div>
  )
}

export default Footer
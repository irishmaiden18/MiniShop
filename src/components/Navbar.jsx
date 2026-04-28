import { Link } from "react-router"

const Navbar = () => {
  return (
    <>
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    </>
  )
}

export default Navbar
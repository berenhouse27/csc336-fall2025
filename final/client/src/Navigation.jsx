import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaBook, FaPlus } from 'react-icons/fa'

function Navigation() {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <nav className="main-navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <FaBook className="logo-icon" />
                    <span>Book Library</span>
                </Link>
                <div className="nav-links">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        <FaHome className="nav-icon" />
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/books"
                        className={`nav-link ${isActive('/books') ? 'active' : ''}`}
                    >
                        <FaBook className="nav-icon" />
                        <span>Books</span>
                    </Link>
                    <Link
                        to="/add-book"
                        className={`nav-link ${isActive('/add-book') ? 'active' : ''}`}
                    >
                        <FaPlus className="nav-icon" />
                        <span>Add Book</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
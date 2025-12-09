import { Link } from 'react-router-dom'
import { FaBook, FaChartBar, FaStar, FaTags } from 'react-icons/fa'

function Home({ books }) {
    // Calculate total number of books
    const totalBooks = books.length

    // Calculate books by genre
    const booksByGenre = {}
    books.forEach(book => {
        const genre = book.genre || 'Unknown'
        booksByGenre[genre] = (booksByGenre[genre] || 0) + 1
    })

    // Calculate average rating
    const booksWithRatings = books.filter(book => book.rating)
    const averageRating = booksWithRatings.length > 0
        ? (booksWithRatings.reduce((sum, book) => sum + book.rating, 0) / booksWithRatings.length).toFixed(1)
        : 'N/A'

    // Get top genres (sorted by count)
    const topGenres = Object.entries(booksByGenre)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    return (
        <div className="home-container">
            <div className="home-header">
                <FaBook className="home-icon" />
                <h1>Welcome to Book Library Manager</h1>
                <p className="home-description">
                    Organize, track, and manage your personal book collection.
                    Add books, rate your reads, and keep notes on your favorite stories.
                </p>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaBook />
                    </div>
                    <div className="stat-content">
                        <h2>{totalBooks}</h2>
                        <p>Total Books</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FaStar />
                    </div>
                    <div className="stat-content">
                        <h2>{averageRating}</h2>
                        <p>Average Rating</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FaTags />
                    </div>
                    <div className="stat-content">
                        <h2>{Object.keys(booksByGenre).length}</h2>
                        <p>Genres</p>
                    </div>
                </div>
            </div>

            {topGenres.length > 0 && (
                <div className="genres-section">
                    <h2>
                        <FaChartBar className="section-icon" />
                        Books by Genre
                    </h2>
                    <div className="genres-grid">
                        {topGenres.map(([genre, count]) => (
                            <div key={genre} className="genre-item">
                                <span className="genre-name">{genre}</span>
                                <span className="genre-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="actions-section">
                <Link to="/books" className="action-button">
                    <FaBook />
                    View All Books
                </Link>
                <Link to="/add-book" className="action-button primary">
                    <FaBook />
                    Add New Book
                </Link>
            </div>
        </div>
    )
}

export default Home
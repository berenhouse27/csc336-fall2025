import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaBook, FaPlus, FaExclamationCircle } from 'react-icons/fa'

const GENRES = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Romance',
    'Thriller',
    'Other'
]

function SearchBooks({ addBook, books }) {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) {
            setError('Please enter a search query')
            return
        }

        setIsSearching(true)
        setError('')
        setSearchResults([])

        try {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`
            )

            if (!response.ok) {
                throw new Error('Failed to search Open Library')
            }

            const data = await response.json()

            if (data.docs && data.docs.length > 0) {
                setSearchResults(data.docs)
            } else {
                setError('No books found. Try a different search term.')
            }
        } catch (err) {
            console.error('Error searching Open Library:', err)
            setError('Failed to search Open Library. Please try again.')
        } finally {
            setIsSearching(false)
        }
    }

    const handleAddBook = (work) => {
        // Extract book info
        const title = work.title || 'Unknown Title'
        const authors = work.author_name || []
        const author = authors.length > 0 ? authors[0] : 'Unknown Author'
        const isbns = work.isbn || []
        const isbn = isbns.length > 0 ? isbns[0] : ''

        // Check for duplicates
        const duplicateByISBN = isbn && books.find(book =>
            book.isbn && book.isbn.toLowerCase() === isbn.toLowerCase()
        )

        const duplicateByTitleAuthor = books.find(book =>
            book.title.toLowerCase().trim() === title.toLowerCase().trim() &&
            book.author.toLowerCase().trim() === author.toLowerCase().trim()
        )

        if (duplicateByISBN || duplicateByTitleAuthor) {
            setError('This book already exists in your library')
            return
        }

        const preFilledBook = {
            title: title,
            author: author,
            genre: '',
            isbn: isbn || '',
            rating: '',
            readDate: '',
            notes: '',
            isRead: false
        }

        navigate('/add-book', { state: { preFilledBook } })
    }

    const getCoverUrl = (work) => {
        if (work.cover_i) {
            return `https://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg`
        }
        return null
    }

    const formatAuthors = (authors) => {
        if (!authors || authors.length === 0) return 'Unknown Author'
        if (authors.length === 1) return authors[0]
        if (authors.length === 2) return authors.join(' and ')
        return `${authors.slice(0, 2).join(', ')}, and ${authors.length - 2} more`
    }

    return (
        <div className="list-container">
            <div className="list-header">
                <h1>
                    <FaSearch className="header-icon" />
                    Search Open Library
                </h1>
                <p className="list-subtitle">
                    Search for books and add them to your library
                </p>
            </div>

            <form onSubmit={handleSearch} className="search-form" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for books by title, author, or ISBN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        disabled={isSearching}
                    />
                </div>
                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSearching}
                    style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', width: '100%' }}
                >
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && (
                <div className="error-message" style={{ marginBottom: '1rem' }}>
                    <FaExclamationCircle />
                    <span>{error}</span>
                </div>
            )}

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h2 style={{ marginBottom: '1rem' }}>
                        Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                    </h2>
                    <div className="books-grid">
                        {searchResults.map((work) => {
                            const coverUrl = getCoverUrl(work)
                            const authors = work.author_name || []
                            const isbns = work.isbn || []

                            return (
                                <div key={work.key} className="book-card">
                                    {coverUrl && (
                                        <div className="book-cover" style={{
                                            marginBottom: '1rem',
                                            textAlign: 'center'
                                        }}>
                                            <img
                                                src={coverUrl}
                                                alt={work.title}
                                                style={{
                                                    maxWidth: '150px',
                                                    maxHeight: '200px',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                        </div>
                                    )}
                                    <h2 className="book-title">{work.title}</h2>
                                    <div className="book-author">
                                        by {formatAuthors(authors)}
                                    </div>
                                    {work.first_publish_year && (
                                        <div className="book-meta" style={{ marginTop: '0.5rem' }}>
                                            <span className="genre-badge">
                                                Published: {work.first_publish_year}
                                            </span>
                                        </div>
                                    )}
                                    {isbns.length > 0 && (
                                        <div className="book-meta" style={{ marginTop: '0.5rem' }}>
                                            <span className="isbn-badge">
                                                ISBN: {isbns[0]}
                                            </span>
                                        </div>
                                    )}
                                    <div style={{ marginTop: '1rem' }}>
                                        <button
                                            className="submit-button"
                                            onClick={() => handleAddBook(work)}
                                            style={{ width: '100%' }}
                                        >
                                            <FaPlus />
                                            Add to Library
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {!isSearching && searchResults.length === 0 && !error && (
                <div className="empty-state">
                    <FaBook className="empty-icon" />
                    <h2>Search for books</h2>
                    <p>Enter a book title, author name, or ISBN to search Open Library</p>
                </div>
            )}
        </div>
    )
}

export default SearchBooks


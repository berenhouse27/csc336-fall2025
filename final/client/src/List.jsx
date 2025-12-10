import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaBook, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa'

function List({ books, updateBook, deleteBook }) {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('all')
    const [readFilter, setReadFilter] = useState('all')
    const [sortBy, setSortBy] = useState('title')
    const [expandedBooks, setExpandedBooks] = useState(new Set())

    // Get unique genres from books
    const genres = useMemo(() => {
        const genreSet = new Set(books.map(book => book.genre).filter(Boolean))
        return Array.from(genreSet).sort()
    }, [books])

    // Filter and sort books
    const filteredAndSortedBooks = useMemo(() => {
        let filtered = books.filter(book => {
            // Filter by genre
            const genreMatch = selectedGenre === 'all' || book.genre === selectedGenre

            // Filter by read status
            const readMatch = readFilter === 'all' || 
                (readFilter === 'read' && book.isRead === true) ||
                (readFilter === 'unread' && (book.isRead === false || book.isRead === undefined))

            // Filter by search query 
            const searchLower = searchQuery.toLowerCase()
            const titleMatch = book.title?.toLowerCase().includes(searchLower)
            const authorMatch = book.author?.toLowerCase().includes(searchLower)
            const searchMatch = !searchQuery || titleMatch || authorMatch

            return genreMatch && readMatch && searchMatch
        })

        // Sort books
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return (a.title || '').localeCompare(b.title || '')
                case 'author':
                    return (a.author || '').localeCompare(b.author || '')
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0)
                case 'readDate':
                    return new Date(b.readDate || 0) - new Date(a.readDate || 0)
                default:
                    return 0
            }
        })

        return filtered
    }, [books, searchQuery, selectedGenre, readFilter, sortBy])

    // Toggle book expansion
    const toggleExpand = (bookId) => {
        const newExpanded = new Set(expandedBooks)
        if (newExpanded.has(bookId)) {
            newExpanded.delete(bookId)
        } else {
            newExpanded.add(bookId)
        }
        setExpandedBooks(newExpanded)
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return null
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    // Star rating
    const renderStars = (rating) => {
        if (!rating) return <span className="no-rating">No rating</span>
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={star <= rating ? 'star filled' : 'star empty'}
                    />
                ))}
                <span className="rating-value">({rating})</span>
            </div>
        )
    }

    // Handle delete
    const handleDelete = async (bookId, bookTitle) => {
        if (window.confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
            const result = await deleteBook(bookId)
            if (!result.success) {
                alert(result.error || 'Failed to delete book')
            }
        }
    }

    return (
        <div className="list-container">
            <div className="list-header">
                <h1>
                    <FaBook className="header-icon" />
                    My Book Library
                </h1>
                <p className="list-subtitle">
                    {filteredAndSortedBooks.length} {filteredAndSortedBooks.length === 1 ? 'book' : 'books'} found
                </p>
            </div>

            <div className="filters-section">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <FaFilter className="filter-icon" />
                        <label htmlFor="genre-filter">Genre:</label>
                        <select
                            id="genre-filter"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Genres</option>
                            {genres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="read-filter">Read Status:</label>
                        <select
                            id="read-filter"
                            value={readFilter}
                            onChange={(e) => setReadFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Books</option>
                            <option value="read">Read</option>
                            <option value="unread">Unread</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-filter">Sort by:</label>
                        <select
                            id="sort-filter"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                            <option value="rating">Rating (High to Low)</option>
                            <option value="readDate">Read Date (Recent First)</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredAndSortedBooks.length === 0 ? (
                <div className="empty-state">
                    <FaBook className="empty-icon" />
                    <h2>No books found</h2>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="books-grid">
                    {filteredAndSortedBooks.map(book => {
                        const isExpanded = expandedBooks.has(book.id)
                        const notesPreview = book.notes ?
                            (book.notes.length > 100 ? book.notes.substring(0, 100) + '...' : book.notes)
                            : null

                        return (
                            <div key={book.id} className="book-card">
                                <div className="book-card-header">
                                    <h2 className="book-title">{book.title}</h2>
                                    <button
                                        className="expand-button"
                                        onClick={() => toggleExpand(book.id)}
                                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                                    >
                                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                </div>

                                <div className="book-author">by {book.author}</div>

                                <div className="book-meta">
                                    <span className="genre-badge">{book.genre}</span>
                                    {book.isRead && (
                                        <span className="read-badge" style={{ 
                                            display: 'inline-flex', 
                                            alignItems: 'center', 
                                            gap: '0.25rem',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem'
                                        }}>
                                            <FaCheckCircle />
                                            Read
                                        </span>
                                    )}
                                    {book.isbn && (
                                        <span className="isbn-badge">ISBN: {book.isbn}</span>
                                    )}
                                </div>

                                <div className="book-rating">
                                    {renderStars(book.rating)}
                                </div>

                                {book.readDate && (
                                    <div className="book-date">
                                        Read: {formatDate(book.readDate)}
                                    </div>
                                )}

                                {isExpanded && (
                                    <div className="book-details">
                                        {book.notes && (
                                            <div className="book-notes">
                                                <strong>Notes:</strong>
                                                <p>{book.notes}</p>
                                            </div>
                                        )}
                                        {book.isbn && (
                                            <div className="book-isbn-full">
                                                <strong>ISBN:</strong> {book.isbn}
                                            </div>
                                        )}
                                        <div className="book-actions">
                                            <button
                                                className="edit-button"
                                                onClick={() => navigate(`/edit-book/${book.id}`)}
                                                aria-label="Edit book"
                                            >
                                                <FaEdit />
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(book.id, book.title)}
                                                aria-label="Delete book"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!isExpanded && notesPreview && (
                                    <div className="book-notes-preview">
                                        {notesPreview}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default List
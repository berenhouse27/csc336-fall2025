import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaBook, FaUser, FaTags, FaBarcode, FaStar, FaCalendar, FaStickyNote, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

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

function AddToList({ addBook, books }) {
    const navigate = useNavigate()
    const location = useLocation()

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        rating: '',
        readDate: '',
        notes: '',
        isRead: false
    })

    // Initialize form with pre-filled data if coming from search
    useEffect(() => {
        if (location.state?.preFilledBook) {
            setFormData({
                title: location.state.preFilledBook.title || '',
                author: location.state.preFilledBook.author || '',
                genre: location.state.preFilledBook.genre || '',
                isbn: location.state.preFilledBook.isbn || '',
                rating: location.state.preFilledBook.rating || '',
                readDate: location.state.preFilledBook.readDate || '',
                notes: location.state.preFilledBook.notes || '',
                isRead: location.state.preFilledBook.isRead || false
            })
            // Clear the state to prevent re-filling on re-render
            window.history.replaceState({}, document.title)
        }
    }, [location.state])

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        // Clear error when typing starts
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        // Clear errors when user updates form
        if (errors.duplicate || errors.submit) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.duplicate
                delete newErrors.submit
                return newErrors
            })
        }
        setError('')
    }

    // Validate individual field
    const validateField = (name, value) => {
        let error = ''

        switch (name) {
            case 'title':
                if (!value.trim()) {
                    error = 'Title is required'
                } else if (value.trim().length < 1) {
                    error = 'Title must be at least 1 character'
                }
                break
            case 'author':
                if (!value.trim()) {
                    error = 'Author is required'
                } else if (value.trim().length < 1) {
                    error = 'Author must be at least 1 character'
                }
                break
            case 'genre':
                if (!value) {
                    error = 'Genre is required'
                } else if (!GENRES.includes(value)) {
                    error = 'Please select a valid genre'
                }
                break
            case 'isbn':
                if (value && !/^[\d-]+$/.test(value)) {
                    error = 'ISBN should contain only numbers and hyphens'
                }
                break
            case 'rating':
                if (value) {
                    const ratingNum = parseInt(value)
                    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
                        error = 'Rating must be between 1 and 5'
                    }
                }
                break
            case 'readDate':
                if (value) {
                    const date = new Date(value)
                    if (isNaN(date.getTime())) {
                        error = 'Please enter a valid date'
                    }
                }
                break
            default:
                break
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }))

        return !error
    }

    // Check for duplicate book
    const checkDuplicate = () => {
        const { title, author, isbn } = formData

        // Check by ISBN
        if (isbn && isbn.trim()) {
            const duplicateByISBN = books.find(book =>
                book.isbn && book.isbn.toLowerCase() === isbn.trim().toLowerCase()
            )
            if (duplicateByISBN) {
                return 'A book with this ISBN already exists'
            }
        }

        // Check by title and author
        const duplicateByTitleAuthor = books.find(book =>
            book.title.toLowerCase().trim() === title.toLowerCase().trim() &&
            book.author.toLowerCase().trim() === author.toLowerCase().trim()
        )
        if (duplicateByTitleAuthor) {
            return 'A book with this title and author already exists'
        }

        return null
    }

    // Validate entire form
    const validateForm = () => {
        const fieldsToValidate = ['title', 'author', 'genre']
        let isValid = true

        fieldsToValidate.forEach(field => {
            if (!validateField(field, formData[field])) {
                isValid = false
            }
        })

        // Validate optional fields
        if (formData.isbn) {
            if (!validateField('isbn', formData.isbn)) {
                isValid = false
            }
        }
        if (formData.rating) {
            if (!validateField('rating', formData.rating)) {
                isValid = false
            }
        }
        if (formData.readDate) {
            if (!validateField('readDate', formData.readDate)) {
                isValid = false
            }
        }

        // Check for duplicates
        const duplicateError = checkDuplicate()
        if (duplicateError) {
            setErrors(prev => ({
                ...prev,
                duplicate: duplicateError
            }))
            isValid = false
        } else {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.duplicate
                return newErrors
            })
        }

        return isValid
    }

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitSuccess(false)
        setError('')

        // Mark all fields as touched
        const allTouched = {}
        Object.keys(formData).forEach(key => {
            allTouched[key] = true
        })
        setTouched(allTouched)

        // Client-side validation
        if (validateForm()) {
            // Prepare book object
            const newBook = {
                title: formData.title.trim(),
                author: formData.author.trim(),
                genre: formData.genre,
                isbn: formData.isbn.trim() || undefined,
                rating: formData.rating ? parseInt(formData.rating) : undefined,
                readDate: formData.readDate || undefined,
                notes: formData.notes.trim() || undefined,
                isRead: formData.isRead || undefined
            }

            // Add book with API
            const result = await addBook(newBook)

            if (result.success) {
                setSubmitSuccess(true)
                setFormData({
                    title: '',
                    author: '',
                    genre: '',
                    isbn: '',
                    rating: '',
                    readDate: '',
                    notes: '',
                    isRead: false
                })
                setTouched({})
                setErrors({})
                setTimeout(() => {
                    setSubmitSuccess(false)
                }, 3000)
            } else {
                // Handle server validation errors
                if (result.errors) {
                    setErrors(prev => ({
                        ...prev,
                        ...result.errors
                    }))
                }
                setError(result.error || 'Failed to add book')
            }
        }
        setIsSubmitting(false)
    }

    // Render star rating selector
    const starSelector = () => {
        const rating = formData.rating ? parseInt(formData.rating) : 0
        return (
            <div className="star-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`star-button ${star <= rating ? 'active' : ''}`}
                        onClick={() => {
                            setFormData(prev => ({ ...prev, rating: star.toString() }))
                            if (errors.rating) {
                                setErrors(prev => ({ ...prev, rating: '' }))
                            }
                        }}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                        <FaStar />
                    </button>
                ))}
                {rating > 0 && (
                    <button
                        type="button"
                        className="clear-rating"
                        onClick={() => {
                            setFormData(prev => ({ ...prev, rating: '' }))
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <FaBook className="form-header-icon" />
                <h1>Add New Book</h1>
                <p className="form-subtitle">Fill in the details to add a book to your library</p>
            </div>

            {submitSuccess && (
                <div className="success-message">
                    <FaCheckCircle />
                    <span>Book added successfully!</span>
                </div>
            )}

            {errors.duplicate && (
                <div className="error-message duplicate-error">
                    <FaExclamationCircle />
                    <span>{errors.duplicate}</span>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <FaExclamationCircle />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="book-form">
                <div className="form-group">
                    <label htmlFor="title">
                        <FaBook className="label-icon" />
                        Title <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title && touched.title ? 'error' : ''}`}
                        placeholder="Enter book title"
                    />
                    {errors.title && touched.title && (
                        <span className="error-text">{errors.title}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="author">
                        <FaUser className="label-icon" />
                        Author <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={`form-input ${errors.author && touched.author ? 'error' : ''}`}
                        placeholder="Enter author name"
                    />
                    {errors.author && touched.author && (
                        <span className="error-text">{errors.author}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="genre">
                        <FaTags className="label-icon" />
                        Genre <span className="required">*</span>
                    </label>
                    <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className={`form-select ${errors.genre && touched.genre ? 'error' : ''}`}
                    >
                        <option value="">Select a genre</option>
                        {GENRES.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                    {errors.genre && touched.genre && (
                        <span className="error-text">{errors.genre}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="isbn">
                        <FaBarcode className="label-icon" />
                        ISBN (optional)
                    </label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className={`form-input ${errors.isbn && touched.isbn ? 'error' : ''}`}
                        placeholder="e.g., 978-0-7432-7356-5"
                    />
                    {errors.isbn && touched.isbn && (
                        <span className="error-text">{errors.isbn}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <FaStar className="label-icon" />
                        Rating (optional)
                    </label>
                    {starSelector()}
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        className={`form-input rating-input ${errors.rating && touched.rating ? 'error' : ''}`}
                        placeholder="1-5"
                    />
                    {errors.rating && touched.rating && (
                        <span className="error-text">{errors.rating}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="isRead" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            id="isRead"
                            name="isRead"
                            checked={formData.isRead}
                            onChange={handleChange}
                            style={{ width: 'auto', cursor: 'pointer' }}
                        />
                        <span>Mark as read (optional)</span>
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="readDate">
                        <FaCalendar className="label-icon" />
                        Read Date (optional)
                    </label>
                    <input
                        type="date"
                        id="readDate"
                        name="readDate"
                        value={formData.readDate}
                        onChange={handleChange}
                        className={`form-input ${errors.readDate && touched.readDate ? 'error' : ''}`}
                    />
                    {errors.readDate && touched.readDate && (
                        <span className="error-text">{errors.readDate}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="notes">
                        <FaStickyNote className="label-icon" />
                        Notes (optional)
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Add your thoughts, review, or notes about this book..."
                        rows="5"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Book'}
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/books')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddToList
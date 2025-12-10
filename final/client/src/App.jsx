import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import List from './List.jsx'
import AddToList from './AddToList.jsx'
import EditBook from './EditBook.jsx'
import Navigation from './Navigation.jsx'
import SearchBooks from './SearchBooks.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

function App() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetchBooks()
    }, [])

    // Fetch books from API
    async function fetchBooks() {
        try {
            const response = await fetch(`${API_BASE_URL}/books`)
            const data = await response.json()
            setBooks(data)
        } catch (err) {
            console.error('Error fetching books:', err)
        }
    }

    // Add new book
    async function addBook(newBook) {
        try {
            const response = await fetch(`${API_BASE_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook)
            })

            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Failed to add book',
                    errors: data.errors || {}
                }
            }

            await fetchBooks()
            return { success: true }
        } catch (err) {
            console.error('Error adding book:', err)
            return {
                success: false,
                error: 'Failed to add book'
            }
        }
    }

    // Update existing book
    async function updateBook(bookId, updatedBook) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook)
            })

            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Failed to update book',
                    errors: data.errors || {}
                }
            }

            await fetchBooks()
            return { success: true }
        } catch (err) {
            console.error('Error updating book:', err)
            return {
                success: false,
                error: 'Failed to update book'
            }
        }
    }

    //  Delete book
    async function deleteBook(bookId) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
                method: 'DELETE'
            })

            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Failed to delete book'
                }
            }

            await fetchBooks()
            return { success: true }
        } catch (err) {
            console.error('Error deleting book:', err)
            return {
                success: false,
                error: 'Failed to delete book'
            }
        }
    }

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home books={books} />} />
                        <Route path="/books" element={<List books={books} updateBook={updateBook} deleteBook={deleteBook} />} />
                        <Route path="/add-book" element={<AddToList addBook={addBook} books={books} />} />
                        <Route path="/edit-book/:id" element={<EditBook books={books} updateBook={updateBook} />} />
                        <Route path="/search-books" element={<SearchBooks addBook={addBook} books={books} />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
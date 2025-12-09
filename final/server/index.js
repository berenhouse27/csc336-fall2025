import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const DATA_FILE = join(__dirname, "data.json");

const app = express();

const VALID_GENRES = [
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
];

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());


async function readBooks() {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        const books = JSON.parse(data);
        if (Array.isArray(books))
            return books;
        else
            return [];
    } catch (error) {
        return [];
    }
}

async function writeBooks(books) {
    const jsonData = JSON.stringify(books, null, 2);
    await writeFile(DATA_FILE, jsonData, "utf-8");
}

function validateBook(book) {
    const errors = {};

    if (!book.title || !book.title.trim()) {
        errors.title = "Title is required";
    }

    if (!book.author || !book.author.trim()) {
        errors.author = "Author is required";
    }

    if (!book.genre || !VALID_GENRES.includes(book.genre)) {
        errors.genre = "Genre is required";
    }

    if (book.isbn && !/^[\d-]+$/.test(book.isbn.trim())) {
        errors.isbn = "ISBN should contain only numbers and hyphens";
    }

    if (book.rating) {
        const rating = parseInt(book.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            errors.rating = "Rating must be between 1 and 5";
        }
    }

    if (book.readDate && isNaN(new Date(book.readDate).getTime())) {
        errors.readDate = "Please enter a valid date";
    }

    return errors;
}

function normalizeBook(book) {
    return {
        title: book.title.trim(),
        author: book.author.trim(),
        genre: book.genre,
        isbn: book.isbn ? book.isbn.trim() : undefined,
        rating: book.rating ? parseInt(book.rating) : undefined,
        readDate: book.readDate,
        notes: book.notes ? book.notes.trim() : undefined
    };
}

function findDuplicate(book, existingBooks) {
    if (book.isbn) {
        const duplicateByISBN = existingBooks.find(existingBook =>
            existingBook.isbn && existingBook.isbn.toLowerCase() === book.isbn.toLowerCase()
        );
        if (duplicateByISBN) {
            return { type: 'isbn', book: duplicateByISBN };
        }
    }

    const duplicateByTitleAuthor = existingBooks.find(existingBook =>
        existingBook.title.toLowerCase().trim() === book.title.toLowerCase() &&
        existingBook.author.toLowerCase().trim() === book.author.toLowerCase()
    );
    if (duplicateByTitleAuthor) {
        return { type: 'title-author', book: duplicateByTitleAuthor };
    }

    return null;
}

app.get("/api/books", async (req, res) => {
    const books = await readBooks();
    res.json(books);
});

app.post("/api/books", async (req, res) => {
    try {
        const books = await readBooks();
        const errors = validateBook(req.body);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ error: "Validation failed", errors });
        }

        const normalizedBook = normalizeBook(req.body);
        const duplicate = findDuplicate(normalizedBook, books);
        if (duplicate) {
            return res.status(409).json({ error: "Duplicate book" });
        }

        const maxId = Math.max(0, ...books.map(book => book.id));
        const bookWithId = { ...normalizedBook, id: maxId + 1 };
        books.push(bookWithId);
        await writeBooks(books);

        res.status(201).json(bookWithId);
    } catch (error) {
        res.status(500).json({ error: "Failed to add book" });
    }
});

app.put("/api/books/:id", async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const books = await readBooks();
        const bookIndex = books.findIndex(book => book.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ error: "Book not found" });
        }

        const updatedBook = { ...books[bookIndex], ...req.body };
        const errors = validateBook(updatedBook);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ error: "Validation failed", errors });
        }

        const normalizedBook = normalizeBook(updatedBook);
        const otherBooks = books.filter(book => book.id !== bookId);
        const duplicate = findDuplicate(normalizedBook, otherBooks);
        if (duplicate) {
            return res.status(409).json({ error: "Duplicate book" });
        }

        books[bookIndex] = { ...normalizedBook, id: bookId };
        await writeBooks(books);
        res.json(books[bookIndex]);
    } catch (error) {
        res.status(500).json({ error: "Failed to update book" });
    }
});

app.delete("/api/books/:id", async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const books = await readBooks();
        const bookIndex = books.findIndex(book => book.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ error: "Book not found" });
        }

        books.splice(bookIndex, 1);
        await writeBooks(books);
        res.json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book" });
    }
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: "Server error" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

app.listen(PORT);
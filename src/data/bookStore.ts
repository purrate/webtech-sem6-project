import { Book } from '../types/Book';

// Initial sample data
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    coverUrl: 'https://images.pexels.com/photos/1927609/pexels-photo-1927609.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
    coverUrl: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    year: 1925,
    coverUrl: 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

// In-memory book store
class BookStore {
  private books: Book[] = [...initialBooks];

  getAllBooks(): Book[] {
    return [...this.books];
  }

  getBookById(id: string): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  addBook(book: Omit<Book, 'id'>): Book {
    const newBook = {
      ...book,
      id: Date.now().toString()
    };
    this.books.push(newBook);
    return newBook;
  }

  updateBook(id: string, updatedBook: Partial<Book>): Book | undefined {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...updatedBook };
      return this.books[index];
    }
    return undefined;
  }

  deleteBook(id: string): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter(book => book.id !== id);
    return initialLength > this.books.length;
  }

  searchBooks(query: string): Book[] {
    const lowercaseQuery = query.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) || 
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const bookStore = new BookStore();
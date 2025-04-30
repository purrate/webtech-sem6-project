import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types/Book';
import { bookApi } from '../api/bookApi';

interface BookContextType {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  searchBooks: (query: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookApi.getBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (book: Omit<Book, 'id'>) => {
    setIsLoading(true);
    try {
      const newBook = await bookApi.addBook(book);
      setBooks(prevBooks => [...prevBooks, newBook]);
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBook = async (id: string, book: Partial<Book>) => {
    setIsLoading(true);
    try {
      const updatedBook = await bookApi.updateBook(id, book);
      if (updatedBook) {
        setBooks(prevBooks => 
          prevBooks.map(b => b.id === id ? updatedBook : b)
        );
      }
    } catch (err) {
      setError('Failed to update book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await bookApi.deleteBook(id);
      if (success) {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      }
    } catch (err) {
      setError('Failed to delete book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchBooks = async (query: string) => {
    setIsLoading(true);
    try {
      if (query.trim() === '') {
        const data = await bookApi.getBooks();
        setBooks(data);
      } else {
        const results = await bookApi.searchBooks(query);
        setBooks(results);
      }
    } catch (err) {
      setError('Failed to search books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookContext.Provider value={{
      books,
      isLoading,
      error,
      addBook,
      updateBook,
      deleteBook,
      searchBooks
    }}>
      {children}
    </BookContext.Provider>
  );
};
import { Book } from '../types/Book';
import { bookStore } from '../data/bookStore';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const bookApi = {
  async getBooks(): Promise<Book[]> {
    await delay(300); // Simulate network request
    return bookStore.getAllBooks();
  },

  async getBook(id: string): Promise<Book | undefined> {
    await delay(200);
    return bookStore.getBookById(id);
  },

  async addBook(book: Omit<Book, 'id'>): Promise<Book> {
    await delay(400);
    return bookStore.addBook(book);
  },

  async updateBook(id: string, book: Partial<Book>): Promise<Book | undefined> {
    await delay(400);
    return bookStore.updateBook(id, book);
  },

  async deleteBook(id: string): Promise<boolean> {
    await delay(300);
    return bookStore.deleteBook(id);
  },

  async searchBooks(query: string): Promise<Book[]> {
    await delay(200);
    return bookStore.searchBooks(query);
  }
};
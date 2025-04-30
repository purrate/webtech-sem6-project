import React from 'react';
import { BookProvider } from './contexts/BookContext';
import Header from './components/Header';
import BookList from './components/BookList';

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <BookList />
        </main>
        <footer className="bg-white py-4 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BookShelf - A Simple Book Management System
          </div>
        </footer>
      </div>
    </BookProvider>
  );
}

export default App;
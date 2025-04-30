import React from 'react';
import { BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';
import { useBooks } from '../contexts/BookContext';

const Header: React.FC = () => {
  const { searchBooks } = useBooks();

  const handleSearch = (query: string) => {
    searchBooks(query);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={28} className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">BookShelf</h1>
          </div>
          
          <div className="w-full md:ml-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
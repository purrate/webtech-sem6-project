import React from 'react';
import { Book } from '../types/Book';
import { Pencil, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="h-40 overflow-hidden">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={`Cover for ${book.title}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Cover Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            {book.genre}
          </span>
          <span className="text-gray-500 text-sm">{book.year}</span>
        </div>
        
        <div className="flex justify-end mt-2 space-x-2">
          <button 
            onClick={() => onEdit(book)}
            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={() => onDelete(book.id)}
            className="p-1.5 text-red-600 hover:bg-red-100 rounded-full transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
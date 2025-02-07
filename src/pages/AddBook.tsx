import React from 'react';
import { useDispatch } from 'react-redux';
import BookForm from '../components/BookForm';
import { addBook } from '../store/bookSlice';
import { Book } from '../types/book';

const AddBook: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddBook = (book: Book) => {
    dispatch(addBook(book));
  };

  return (
    <div>
      <h2 className="text-2xl px-6 md:px-0 font-bold mb-6 text-center">Add New Book</h2>
      <BookForm onSubmit={handleAddBook} />
    </div>
  );
};

export default AddBook;

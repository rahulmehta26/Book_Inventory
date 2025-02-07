import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteBook, updateBook } from '../store/bookSlice';
import BookForm from '../components/BookForm';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import Loading from '../components/Loading';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const book = useSelector((state: RootState) =>
    state.books.books.find((b) => b.id === id)
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Book not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(book.id));
      navigate('/books');
    }
  };

  const handleUpdate = (updatedBook: typeof book) => {
    dispatch(updateBook(updatedBook));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
        <BookForm initialData={book} onSubmit={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={
              book.coverUrl ||
              'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3'
            }
            alt={book.title}
          />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
              <p className="mt-2 text-sm text-gray-500">by {book.author}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-indigo-600"
              >
                <MdModeEditOutline className="h-5 w-5 cursor-pointer" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <FaTrashAlt className="h-5 cursor-pointer w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {book.genre}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-500">{book.description}</p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-500">
              <p>Added on {new Date(book.createdAt).toLocaleDateString()}</p>
              <p>Last updated on {new Date(book.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/book';
import { RxCross2 } from 'react-icons/rx';

interface BookFormProps {
  initialData?: Book;
  onSubmit: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Book>>(
    initialData || {
      title: '',
      author: '',
      genre: '',
      description: '',
      coverUrl: '',
    }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Book, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Book, string>> = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.author?.trim()) newErrors.author = 'Author is required';
    if (!formData.genre?.trim()) newErrors.genre = 'Genre is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const removeImage = () => {
    setFormData({ ...formData, coverUrl: '' });
   
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
   
      if (!file.type.match('image/jpe?g')) {
        setErrors({ ...errors, coverUrl: 'Only JPG/JPEG images are allowed' });
        return;
      }

      
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, coverUrl: 'Image size should be less than 5MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverUrl: reader.result as string });
        setErrors({ ...errors, coverUrl: undefined });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookData: Book = {
      id: initialData?.id || crypto.randomUUID(),
      ...formData as Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(bookData);
    navigate('/books');
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md border border-[#000] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md border border-[#000] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md border border-[#000] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Image</label>

        <div className="mt-2 flex justify-between items-center space-x-4">

          <div
          className='flex items-center gap-2'
          >

        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 font-semibold text-sm">
              Choose File
              <input
                type="file"
                accept=".jpg,.jpeg"
                onChange={handleImageUpload}
                className="hidden"
              />

            </label>

            {
              formData.coverUrl && (

            <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Image selected</span>
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  title="Remove image"
                >
                  <RxCross2 className="h-4 w-4" />
                </button>
              </div>
              )
            }

          </div>

          {formData.coverUrl && (
            <img
              src={formData.coverUrl}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-md"
            />
          )}
        </div>
        {errors.coverUrl && <p className="mt-1 text-sm text-red-600">{errors.coverUrl}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full p-3 rounded-md border border-[#000] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/books')}
          className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;

import type React from "react"
import { useState, useMemo, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../store/store"
import { FaSearch, FaFilter, FaChevronDown } from "react-icons/fa"
import Loading from "../components/Loading"
import { RxCross2 } from "react-icons/rx"

interface Book {
  id: string
  title: string
  author: string
  genre: string
  coverUrl?: string
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        switch (event.key) {
          case 'Escape':
            setIsOpen(false);
            break;
          case 'Enter':
            if (document.activeElement?.getAttribute('role') === 'option') {
              (document.activeElement as HTMLElement).click();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  return (
    <div 
      ref={selectRef} 
      className="relative w-full max-w-xs"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <div 
        className={`
          flex items-center w-full rounded-md border 
          ${isOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-300'}
          bg-white shadow-sm transition-all duration-200
        `}
      >
       <FaFilter 
       onClick={() => setIsOpen(!isOpen) }
       className="w-4.5 h-4.5 cursor-pointer absolute left-3 text-gray-500" />


        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 py-2 pl-10 pr-3 cursor-pointer"
        >
          <span className={`${value ? 'text-black' : 'text-gray-500'}`}>
            {value || placeholder}
          </span>
        </div>

        <div className="flex items-center space-x-2 pr-2">
          {value && (
            <button 
              onClick={handleClear}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              aria-label="Clear selection"
            >
              <RxCross2 className=" w-5 h-5 " strokeWidth={1} />
            </button>
          )}
          
          <div 
          onClick={() => setIsOpen(!isOpen) }
          className={`text-gray-500 cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            <FaChevronDown />
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="
            absolute z-20 w-full mt-1 
            bg-white border border-gray-200 
            rounded-md shadow-lg 
            max-h-60 overflow-y-auto 
            scrollbar-hide
          "
          role="listbox"
        >
          <div className="py-1">
            <div 
              role="option"
              tabIndex={0}
              aria-selected={value === ''}
              className={`
                px-4 py-2 cursor-pointer 
                hover:bg-indigo-50 
                ${value === '' ? 'bg-indigo-100' : ''}
              `}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
            >
              All Genres
            </div>

            {options.map((option) => (
              <div
                key={option}
                role="option"
                tabIndex={0}
                aria-selected={value === option}
                className={`
                  px-4 py-2 cursor-pointer 
                  hover:bg-indigo-50 
                  ${value === option ? 'bg-indigo-100' : ''}
                `}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGenre, setFilterGenre] = useState("")

  const genres = useMemo(() => Array.from(new Set(books.map((book) => book.genre))), [books])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGenre = !filterGenre || book.genre === filterGenre
      return matchesSearch && matchesGenre
    })
  }, [books, searchTerm, filterGenre])

  if (!books) {
    return <Loading />
  }

  return (
    <div>
      <div className="mb-6 px-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">

          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-800" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-3 rounded-md border-[#000] bg-white outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-label="Search books"
          />
        </div>
        <CustomSelect
          value={filterGenre}
          onChange={setFilterGenre}
          options={genres}
          placeholder="All Genres"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book: Book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-3 aspect-h-4 relative">
              <img
                src={
                  book.coverUrl 
                }
                alt={`Cover of ${book.title}`}
                className="object-cover object-center w-full h-48 rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{book.author}</p>
              <span className="mt-2 inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
                {book.genre}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center px-6 md:px-0 flex flex-col justify-center items-center py-12">

          <img 
          src="/noBook.jpg"
          alt="No books found"
          className="md:w-[50%] md:h-[50%] object-cover rounded object-center "
          />
          <p className="text-gray-500 mt-2 font-bold text-2xl">No books found. Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  )
}

export default BookList
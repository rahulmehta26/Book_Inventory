import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/book';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: JSON.parse(localStorage.getItem('books') || '[]')
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      localStorage.setItem('books', JSON.stringify(state.books));
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
        localStorage.setItem('books', JSON.stringify(state.books));
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      localStorage.setItem('books', JSON.stringify(state.books));
    }
  }
});

export const { addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
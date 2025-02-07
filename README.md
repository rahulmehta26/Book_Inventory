# Book Collection Manager

## Features

- **Book Management**: Add, edit, and delete books from your collection
- **Rich Book Details**: Store comprehensive information including title, author, genre, and description
- **Image Support**: Upload and manage book cover images (JPG/JPEG format)
- **Search & Filter**: Easily find books using search and genre filters
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Local Storage**: Persistent data storage using browser's local storage
- **Random Book Thoughts**: Inspiring book-related quotes that change every minute

## Quick Start

### Creating a New Project

1. Create a new Vite project with React and TypeScript:
  
   npm create vite@latest book-collection -- --template react-ts
   cd book-collection
   

2. Install base dependencies:
   
   npm install
   

3. Install and setup Tailwind CSS:
   
   npm install tailwindcss @tailwindcss/vite
   

4. Configure the Vite plugin

    Add the @tailwindcss/vite plugin to your Vite configuration.


   ```js
   import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
   ```

5. Add Tailwind directives to `src/index.css`:
   ```css
   @import "tailwindcss";
   ```

6. Install required dependencies:
   
   npm install @reduxjs/toolkit react-redux react-router-dom react-icons
   ```

### Running Existing Project

1. Clone the repository
2. Install dependencies:
  
   npm install
   ```
3. Start the development server:
   
   npm run dev
   ```

## Project Structure

```
src/
 ├── components/           # Reusable UI components
 │    ├── BookForm.tsx     # Form for adding/editing books
 │    ├── Navbar.tsx       # Navigation bar
 │    ├── Layout.tsx       # Main layout wrapper component
 │    ├── Card.tsx         # Card component
 │    ├── Loading.tsx      # Loading spinner/component
 ├── hooks/                # Custom React hooks
 │    ├── useRandomThoughts.ts # Hook for fetching random book-related thoughts
 ├── pages/                # Page components
 │    ├── HomePage.tsx     # Home page
 │    ├── BookDetails.tsx  # Book details view
 │    ├── AddBook.tsx      # Page for adding new books
 │    └── BookList.tsx     # Page for displaying the book list
 ├── store/                # Redux store configuration
 │    ├── booksSlice.ts    # Redux slice for books
 │    └── store.ts         # Main Redux store
 ├── types/                # TypeScript type definitions
 │    ├── Book.ts          # Interface for Book type
 ├── utils/                # Utility functions
 │    ├── bookThoughts.ts  # Random book-related quotes
 ├── main.tsx              # Application entry point
 ├── App.tsx               # Main App component
 └── index.css             # Tailwind CSS styles



```

## Key Features Explained

### Book Management
- **Adding Books**: 
  - Fill in book details including title, author, genre, and description
  - Upload book cover images (JPG/JPEG format only)
  - Automatic validation ensures all required fields are filled
  - Image size limit of 5MB for optimal performance

- **Viewing Books**: 
  - Grid layout displays book covers with essential information
  - Click on any book to view full details
  - Responsive design adapts to different screen sizes

- **Editing Books**:
  - Update any book information
  - Replace or remove cover images
  - All changes are saved automatically

- **Search & Filter**:
  - Real-time search across titles and authors
  - Filter books by genre
  - Clear visual feedback when no results are found

### Home Page Features
- **Welcome Section**: Clear introduction to the application
- **Quick Access Cards**: Direct links to view collection and add new books
- **Inspirational Quotes**: Random book-related thoughts that refresh every minute
- **Responsive Layout**: Adapts seamlessly to different screen sizes

### Data Management
- **Redux Store**: Centralized state management using Redux Toolkit
- **Local Storage**: Persistent data storage across browser sessions
- **Type Safety**: Full TypeScript implementation for reliable code

## Technical Implementation

### State Management
- Uses Redux Toolkit for efficient state management
- Implements slice pattern for books management
- Automatic state persistence using local storage

### Routing
- React Router v6 for navigation
- Protected routes where necessary
- Clean URL structure

### UI/UX Features
- Tailwind CSS for styling
- Responsive design principles
- Form validation and error handling
- Loading states and error boundaries
- React Icons for consistent iconography

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State managed with [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

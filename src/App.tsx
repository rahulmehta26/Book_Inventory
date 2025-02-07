import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<BookList />} />
            <Route path="books/:id" element={<BookDetails />} />
            <Route path="add" element={<AddBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
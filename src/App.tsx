import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Layout from './components/Layout';
import Loading from './components/Loading';
import { lazy, useEffect, useState } from 'react';


const Home = lazy(() => import('./pages/Home'));
const BookList = lazy(() => import('./pages/BookList'));
const AddBook = lazy(() => import('./pages/AddBook'));
const BookDetails = lazy(() => import('./pages/BookDetails'));

const SuspenseWithDelay = ({ children }: { children: React.ReactNode }) => {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDelay(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (delay) {
    return <Loading />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <SuspenseWithDelay>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="books" element={<BookList />} />
              <Route path="books/:id" element={<BookDetails />} />
              <Route path="add" element={<AddBook />} />
            </Route>
          </Routes>
        </SuspenseWithDelay>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
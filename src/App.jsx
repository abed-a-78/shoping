import { Routes, Route, Navigate } from 'react-router-dom';

//Components
import ProductsPage from './pages/ProductsPage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFound404 from './pages/NotFound404';
import ProductsProvider from './context/ProductsContext';

const App = () => {
  return (
    <ProductsProvider>
      <Routes>
        <Route index element={<Navigate />} to="/products" replace />
        <Route path="/products" element={<ProductsPage />} />
        {/* daynamic page */}
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* page error 404 */}
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </ProductsProvider>
  );
};

export default App;
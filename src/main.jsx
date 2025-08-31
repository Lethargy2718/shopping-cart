import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import './styles/globals.css'

import Root from './routes/root/root';
import Hero from './routes/hero/hero';
import ErrorPage from './ErrorPage';
import Shop from './routes/shop/shop';
import Favorites from './routes/favorites/favorites';
import Cart from './routes/cart/cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Hero /> },
      { path: "shop", element: <Shop /> },
      { path: "shop/favorites", element: <Favorites /> },
      { path: "cart", element: <Cart /> },
      // { path: "shop/:category", element: <Category /> }, // from category list, shows one category only
      // { path: "shop/product/:productId", element: <Product /> }, // product page from clicking on a product or searching for it
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

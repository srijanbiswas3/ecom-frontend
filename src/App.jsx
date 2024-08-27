import { ThemeProvider } from "@/components/theme-provider";
import Header from './components/Header/Header';
import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import { LoginContextProvider } from "./context/LoginContext";
import { UserContextProvider } from "./context/UserContext";
import ErrorPage from "./pages/Error/error-page";
import { Provider } from "react-redux";
import store from "./redux/store";
import React, { Suspense } from 'react';
import Loading from "./components/Loading/Loading";

// Lazy load components
const About = React.lazy(() => import('./pages/About/About'));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Payment = React.lazy(() => import("./pages/Payment/Payment"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Products = React.lazy(() => import("./pages/Products/Products"));

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading/>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<Loading/>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/products",
          element: (
            <Suspense fallback={<Loading/>}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "/products/:productId",
          element: (
            <Suspense fallback={<Loading/>}>
              <ProductDetails />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<Loading/>}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "/payment",
          element: (
            <Suspense fallback={<Loading/>}>
              <Payment />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<Loading/>}>
              <About />
            </Suspense>
          ),
        },
      ]
    },
  ]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <LoginContextProvider >
          <UserContextProvider>
            <CartContextProvider>
              <RouterProvider router={router} />
              <Toaster />
            </CartContextProvider>
          </UserContextProvider>
        </LoginContextProvider>
      </Provider>
    </ThemeProvider>
  )
}

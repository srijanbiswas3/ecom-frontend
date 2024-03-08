import { ThemeProvider } from "@/components/theme-provider"
import Header from './components/Header/Header'
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Toaster } from "@/components/ui/sonner"
import { LoginContextProvider } from "./context/LoginContext";
import { UserContextProvider } from "./context/UserContext";
import Cart from "./pages/Cart/Cart";
import { CartContextProvider } from "./context/CartContext";
import Payment from "./pages/Payment/Payment";
import ErrorPage from "./pages/Error/error-page";



export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        // { index: true, element: <Navigate to="/home" replace /> },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/about",
          element: <About />,
        },]
    },

  ]);
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LoginContextProvider >
        <UserContextProvider>
          <CartContextProvider>

            <RouterProvider router={router} >


            </RouterProvider>
            {/* <Header /> */}
            <Toaster />
            {/* <Router>
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Toaster />
            </Router> */}
          </CartContextProvider>
        </UserContextProvider>
      </LoginContextProvider>


    </ThemeProvider>
  )
}


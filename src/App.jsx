import { ThemeProvider } from "@/components/theme-provider"
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
// import { useUser } from "@clerk/clerk-react";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Toaster } from "@/components/ui/sonner"
import UserContextProvider from "./context/UserContextProvider";

export default function App() {
  // const user = useUser()


  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserContextProvider >

        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </UserContextProvider>
      <Toaster />
    </ThemeProvider>
  )
}


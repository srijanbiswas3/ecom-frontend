import { logOut } from "@/api/LoginApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";
import { CartContext, useCart } from "@/context/CartContext";
import { LoginContext } from "@/context/LoginContext";
import { UserContext } from "@/context/UserContext";
import { faBars, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/shoeracklogo.png';
import { ModeToggle } from '../mode-toggle';
import { Outlet } from "react-router-dom";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false)

  const { cartItems } = useCart()

  const menuHandler = () => {
    setShowMenu(!showMenu)
  }

  const handleSignIn = () => {
    navigate('/login')

  }
  const handleLogOut = () => {

    logOut().then(() => {
      console.log("User Logged Out"); setUser(null);
      localStorage.removeItem('refresh_token')
      setIsLoggedIn(false)
      localStorage.removeItem('isLoggedIn');
    }).catch(e => console.log(e));

  }

  return (
    <div className="h-screen ">
      <nav className='h-20 w-full bg-black dark:bg-blue-950 flex items-center justify-around fixed z-40'>
        <div className='md:flex items-center cursor-pointer ms-6' onClick={() => navigate('/')}>
          <img className='h-10 rounded-lg ml-6' src={Logo} alt="logo" />
          <h2 className='text-white ml-3 dark:text-white text-lg font-bold hidden md:inline'>ShoeKeeper</h2>
        </div>
        <Link to={'/products'}><h2 className='font-bold text-white hidden md:inline'>Shop</h2> </Link>
        <Input className='p-2 rounded-lg w-auto md:w-[50vw]' type="text" placeholder='Search' />
        <div className='hidden md:inline'>
          <ModeToggle type='icon' />
        </div>
        <div className='flex space-x-3'>
          <div className='space-x-3 hidden md:flex'>
            <DropdownMenu>
              <DropdownMenuTrigger >
                <>
                  {user && <span className="text-white m-3 font-bold"> Welcome {user?.firstName}</span>}
                  <FontAwesomeIcon className='text-white text-2xl cursor-pointer' icon={faUser} />
                </>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel>{user?.firstName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {!isLoggedIn && <DropdownMenuItem onClick={handleSignIn}>Log In</DropdownMenuItem>}
                {isLoggedIn && <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            <h2 className='text-white font-bold'>Orders</h2>
          </div>
          <FontAwesomeIcon className='text-white text-2xl cursor-pointer' icon={faShoppingCart} onClick={() => navigate('/cart')} />
          <span className="bg-green-300 rounded-full text-center font-medium text-sm h-5 w-5 -mt-3 ">{cartItems.length}</span>
        </div>
      </nav>
      {/* Side Navigation */}
      <Sheet className='h-40' >
        <SheetTrigger > <FontAwesomeIcon className='text-white text-3xl cursor-pointer ms-3 md:hidden fixed mt-2 z-50' icon={faBars} onClick={menuHandler} /></SheetTrigger>
        <SheetContent className={`md:hidden `} side='left'>
          <SheetHeader>
            <div className=' flex items-center cursor-pointer' onClick={() => navigate('/')}>
              <img className='h-10 rounded-lg mr-3' src={Logo} alt="logo" />
              <h2 className='text-black dark:text-white text-lg font-bold'>ShoeKeeper</h2>
            </div>

          </SheetHeader>
          <br />
          {user ?
            <div className='m-3'>
              <span className='block text-left'> Welcome!</span>
              <span className='block text-left'>{user?.firstName}</span>
            </div>
            : <SheetClose >
              <span className='block text-left m-2 font-bold' onClick={handleSignIn}> Login</span>
            </SheetClose>
          }
          <hr />
          <br />
          <div className='flex flex-col space-y-4 p-2 justify-center'>

            <ModeToggle type='switch' />
            <Link to={'/'} className='self-start'> <SheetClose ><h2 className='font-bold'>Home</h2> </SheetClose></Link>
            <Link to={'/products'} className='self-start'> <SheetClose ><h2 className='font-bold'>Shop</h2> </SheetClose></Link>

            <h2 className='font-bold'>Orders</h2>
            <h2 className='font-bold'>Cart</h2>
            <h2 className='font-bold'>Settings</h2>
            <hr />
            {user && <span className='self-start text-red-500 font-medium' onClick={handleLogOut}>  <SheetClose >Log Out</SheetClose></span>}

          </div>
        </SheetContent>
      </Sheet>
      <Outlet />
    </div >
  )
}

export default Header
import React, { useEffect, useState } from 'react'
import { ModeToggle } from '../mode-toggle'
import Logo from '../../assets/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from 'react-router-dom';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"




function Header() {


  const navigate = useNavigate();
  const clerk = useClerk();

  const { isSignedIn, user, isLoaded } = useUser();

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (!isSignedIn)
      clerk.openSignIn();
  }, [])

  const menuHandler = () => {
    setShowMenu(!showMenu)

  }

  return (
    <div>

      <nav className='h-20 w-full bg-blue-700 flex items-center justify-around fixed z-20'>

        <div className='md:flex items-center cursor-pointer ms-6' onClick={() => navigate('/')}>
          <img className='h-10 rounded-lg mr-3' src={Logo} alt="logo" />
          <h2 className='text-blue-100 dark:text-white text-lg font-bold hidden md:inline'>ECom App</h2>
        </div>
        <input className='p-2 rounded-lg z-20 md:w-80 ' type="text" placeholder='Search' />
        <div className='flex space-x-3'>
          <div className='space-x-3 hidden md:flex'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FontAwesomeIcon className='text-white text-2xl cursor-pointer' icon={faUser} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel>{user?.primaryEmailAddress.emailAddress}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {!isSignedIn && <DropdownMenuItem onClick={() => { clerk.openSignIn(); }}>Log In</DropdownMenuItem>}
                {isSignedIn && <DropdownMenuItem onClick={() => { clerk.signOut(); }}>Log Out</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            <h2 className='text-white font-bold'>Orders</h2>
          </div>
          <FontAwesomeIcon className='text-white text-2xl cursor-pointer ' icon={faShoppingCart} />
        </div>
      </nav>

      <Sheet className='h-40' >
        <SheetTrigger > <FontAwesomeIcon className='text-white text-2xl cursor-pointer ms-3 md:hidden fixed mt-2.5 z-20' icon={faBars} onClick={menuHandler} /></SheetTrigger>
        <SheetContent className={`md:hidden `} side='left'>
          <SheetHeader>
            <div className=' flex items-center cursor-pointer' onClick={() => navigate('/')}>
              <img className='h-10 rounded-lg mr-3' src={Logo} alt="logo" />
              <h2 className='text-black dark:text-white text-lg font-bold'>ECom App</h2>
            </div>

          </SheetHeader>
          <br />
          {user ?
            <div>
              <span className='block text-left'> Welcome</span>
              <span className='block text-left'>{user?.primaryEmailAddress.emailAddress}</span>
            </div>
            : <SheetClose >
              <span className='block text-left' onClick={() => { clerk.openSignIn(); }}> Login</span>
            </SheetClose>
          }
          <hr />
          <br />
          <div className='flex flex-col'>
            <Link to={'/'}> <SheetClose ><h2 className='font-bold'>Home</h2> </SheetClose></Link>
            <Link to={'/products'}> <SheetClose ><h2 className='font-bold'>Products</h2> </SheetClose></Link>

            <h2 className='font-bold'>Orders</h2>
            <h2 className='font-bold'>Cart</h2>
            <h2 className='font-bold'>Settings</h2>
            {user && <span onClick={() => { clerk.signOut(); }}>Log Out</span>}
          </div>
        </SheetContent>
      </Sheet>






    </div >
  )
}

export default Header
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


import { Input } from "@/components/ui/input"





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
      <nav className='h-20 w-full bg-black dark:bg-blue-950 flex items-center justify-around fixed z-10'>
        <div className='md:flex items-center cursor-pointer ms-6' onClick={() => navigate('/')}>
          <img className='h-10 rounded-lg ml-6' src={Logo} alt="logo" />
          <h2 className='text-white ml-3 dark:text-white text-lg font-bold hidden md:inline'>ECom App</h2>
        </div>
        <Link to={'/products'}><h2 className='font-bold text-white hidden md:inline'>Products</h2> </Link>
        <Input className='p-2 rounded-lg w-auto md:w-[50vw]' type="text" placeholder='Search' />
        <div className='hidden md:inline'>
          <ModeToggle type='icon' />
        </div>
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
      {/* Side Navigation */}
      <Sheet className='h-40' >
        <SheetTrigger > <FontAwesomeIcon className='text-white text-3xl cursor-pointer ms-3 md:hidden fixed mt-2 z-20' icon={faBars} onClick={menuHandler} /></SheetTrigger>
        <SheetContent className={`md:hidden `} side='left'>
          <SheetHeader>
            <div className=' flex items-center cursor-pointer' onClick={() => navigate('/')}>
              <img className='h-10 rounded-lg mr-3' src={Logo} alt="logo" />
              <h2 className='text-black dark:text-white text-lg font-bold'>ECom App</h2>
            </div>

          </SheetHeader>
          <br />
          {user ?
            <div className='m-3'>
              <span className='block text-left'> Welcome!</span>
              <span className='block text-left'>{user?.primaryEmailAddress.emailAddress}</span>
            </div>
            : <SheetClose >
              <span className='block text-left' onClick={() => { clerk.openSignIn(); }}> Login</span>
            </SheetClose>
          }
          <hr />
          <br />
          <div className='flex flex-col space-y-4 p-2 justify-center'>

            <ModeToggle type='switch' />
            <Link to={'/'} className='self-start'> <SheetClose ><h2 className='font-bold'>Home</h2> </SheetClose></Link>
            <Link to={'/products'} className='self-start'> <SheetClose ><h2 className='font-bold'>Products</h2> </SheetClose></Link>

            <h2 className='font-bold'>Orders</h2>
            <h2 className='font-bold'>Cart</h2>
            <h2 className='font-bold'>Settings</h2>
            <hr />
            {user && <span className='self-start text-red-500 font-medium' onClick={() => { clerk.signOut(); }}>  <SheetClose >Log Out</SheetClose></span>}

          </div>
        </SheetContent>
      </Sheet>
    </div >
  )
}

export default Header
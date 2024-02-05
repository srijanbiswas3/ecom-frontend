import React, { useEffect, useState } from 'react'
import { ModeToggle } from '../mode-toggle'
import Logo from '../../assets/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
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



function Header() {


  const navigate = useNavigate();
  const clerk = useClerk();

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (!isSignedIn)
      clerk.openSignIn();
  }, [])

  return (
    <div className='bg-slate-400 h-20 flex justify-around items-center p-4 '>

      <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
        <img className='h-10 rounded-lg mr-3' src={Logo} alt="logo" />
        <h2 className='text-blue-800 dark:text-white text-lg font-bold'>ECom App</h2>




        <input className='p-2 rounded-lg' type="text" placeholder='Search' />
      </div>
      <div className='items-center space-x-2 flex'>
        <Link className='text-white font-bold cursor-pointer' to={'/products'}>Products</Link>

        <div className=' flex  space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FontAwesomeIcon className='text-white text-2xl cursor-pointer' icon={faUser} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              {!isSignedIn && <DropdownMenuItem onClick={() => { clerk.openSignIn(); }}>Log In</DropdownMenuItem>}
              {isSignedIn && <DropdownMenuItem onClick={() => { clerk.signOut(); }}>Log Out</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>


          <h2 className='text-white font-bold'>{user?.primaryEmailAddress.emailAddress}</h2>
        </div>
        <h2 className='text-white font-bold'>Orders</h2>
        <FontAwesomeIcon className='text-white text-2xl cursor-pointer' icon={faShoppingCart} />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header
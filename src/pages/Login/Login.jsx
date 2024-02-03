import React, { useEffect, useState } from 'react';
import { SignOutButton, SignInButton, SignedIn, SignedOut, useClerk, SignIn } from "@clerk/clerk-react"
import Home from '../Home/Home';
import { useNavigate } from 'react-router-dom';



const Login = () => {

  const navigate = useNavigate()
  const [signOut, setSignOut] = useState(false)
  const clerk = useClerk();
  useEffect(() => {
    clerk.openSignIn({})
  }, [])
  useEffect(() => {
    clerk.openSignIn({})
  }, [signOut])



  return (
    <div>
      <SignedOut>
        <SignInButton />
        <p>This content is public. Only signed out users can see the SignInButton above this text.</p>
      </SignedOut>
      <SignedIn>
        <SignOutButton signOutCallback={() => { setSignOut(true); navigate('/login') }} />

      </SignedIn>

    </div>
  );
};

export default Login;

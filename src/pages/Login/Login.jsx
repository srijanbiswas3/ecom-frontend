import React, { useEffect, useRef, useState } from 'react';

import Home from '../Home/Home';
import { Form, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { login, signUp } from '@/api/LoginApi';
import Cookies from 'universal-cookie';




const Login = () => {
  const cookies = new Cookies();

  const navigate = useNavigate();


  const [lEmail, setLEmail] = useState('')
  const [lPassword, setLPassword] = useState('')
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    role: 'USER'
  });
  const [activeTab, setActiveTab] = useState('login');

  const handleInputChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value
    });
  }

  const handleLogin = () => {
    console.log(lEmail + " and " + lPassword)

    login(lEmail, lPassword).then(resp => {
      console.log(resp.accessToken, resp.refreshToken);
      // Set the access token as an HTTP-only cookie
      cookies.set('access_token', resp.accessToken, {
        path: '/',
        httpOnly: false,
        secure: false // Set to true if using HTTPS
      });
      localStorage.setItem('refresh_token', resp.refreshToken);
    }).then(() => navigate('/'));

  }

  const handleSignUp = () => {
    signUp(signupData).then(resp => {
      if (resp) {
        setActiveTab('login');
      }
    })

  }

  return (
    <div className='container mt-32'>
      <div className='space-y-4 items-center  flex flex-col'>
        <Tabs defaultValue='login' value={activeTab} className="w-[400px] m-2 p-3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={(e) => setActiveTab('login')}>Login</TabsTrigger>
            <TabsTrigger value="signup" onClick={(e) => setActiveTab('signup')}>SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login to you account if you already have an account.
                  For Signing up, switch to next tab
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="lemail" type="email" placeholder="Enter Email Here..." value={lEmail} onChange={(e) => { setLEmail(e.target.value) }} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="lpassword" type="password" placeholder="Enter Password Here..." value={lPassword} onChange={(e) => { setLPassword(e.target.value) }} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => { handleLogin() }}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign up/Register</CardTitle>
                <CardDescription>
                  Sign up for a account.
                  Once Signed up you will be asked to login to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="sname" name="name" type="text" placeholder="Enter Full Name Here..." value={signupData.name} onChange={handleInputChange} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="semail" name="email" type="email" placeholder="Enter Email Here..." value={signupData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="spassword" name="password" type="password" placeholder="Enter Password Here..." value={signupData.password} onChange={handleInputChange} />
                </div>
                {/* <div className="space-y-1">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input id="spassword" type="password" placeholder="Confirm Password Here..." value={signupData.password} onChange={handleInputChange} />
                </div> */}
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="sphone" name="phone" type="text" placeholder="Enter Phone Here..." value={signupData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="saddress">Address</Label>
                  <Textarea id="saddress" name="address" type="text" placeholder="Enter Address Here..." value={signupData.address} onChange={handleInputChange} />
                </div>

              </CardContent>
              <CardFooter>
                <Button onClick={() => { handleSignUp() }}>Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <hr />

      </div>

    </div>
  );
};

export default Login;

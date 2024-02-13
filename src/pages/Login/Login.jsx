import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, signUp } from '@/api/LoginApi';
import UserContext from '@/context/UserContext';
import { toast } from "sonner";
import Cookies from 'universal-cookie';




const Login = () => {
  const cookies = new Cookies();

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();


  const [lEmail, setLEmail] = useState('')
  const [lPassword, setLPassword] = useState('')
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    userType: 'CUSTOMER'
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
      if (resp == null) {
        toast("Error Logging in. Please check User or Password ");
        return;
      }
      const userInfo = JSON.parse(resp.userInfo);
      console.log(userInfo.name);
      setUser(userInfo)

      // Set the access token as an HTTP-only cookie
      cookies.set('access_token', resp.accessToken, {
        path: '/',
        httpOnly: true,
        secure: false // Set to true if using HTTPS
      });
      localStorage.setItem('refresh_token', resp.refreshToken);
      navigate('/')
    })
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
                <Button onClick={handleLogin}>Login</Button>
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
                <div className='flex space-x-2'>
                  <div className="space-y-1">
                    <Label htmlFor="name">First Name</Label>
                    <Input id="sfname" name="firstName" type="text" placeholder="First Name..." value={signupData.firstName} onChange={handleInputChange} />

                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Last Name</Label>
                    <Input id="slname" name="lastName" type="text" placeholder="Last Name..." value={signupData.lastName} onChange={handleInputChange} />

                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="semail" name="email" type="email" placeholder="Enter Email Here..." value={signupData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="spassword" name="password" type="password" placeholder="Enter Password Here..." value={signupData.password} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="sphone" name="phone" type="text" placeholder="Enter Phone Here..." value={signupData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input id="addressLine1" name="addressLine1" type="text" placeholder="Address Line 1 ..." value={signupData.addressLine1} onChange={handleInputChange} />
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input id="addressLine2" name="addressLine2" type="text" placeholder="Address Line 2 ..." value={signupData.addressLine2} onChange={handleInputChange} />
                  <div className='flex space-x-2'>
                    <div>

                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" type="text" placeholder="City..." value={signupData.city} onChange={handleInputChange} />
                    </div>
                    <div>

                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" type="text" placeholder="State..." value={signupData.state} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <div>
                      <Label htmlFor="country">Coutry</Label>
                      <Input id="country" name="country" type="text" placeholder="Country..." value={signupData.country} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" type="text" placeholder="Zip Code..." value={signupData.zipCode} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>

              </CardContent>
              <CardFooter>
                <Button onClick={() => { handleSignUp() }}>Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>


      </div>

    </div>
  );
};

export default Login;

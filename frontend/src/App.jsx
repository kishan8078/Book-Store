import React,{useContext, useState} from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';

import RootLayouts from './Layouts.jsx/RootLayouts';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';



function App() {
const [loggedIn , setLoggedIn] = useState(true);

const handleLogin = () => {
  setLoggedIn(!loggedIn);
}

const router = createBrowserRouter(

  

  createRoutesFromElements(
    
    <Route path = '/' element = {<RootLayouts loggedIn={loggedIn}/>}>
      
      <Route index element = {<Home />} />
      <Route path = 'login' element = {<Login loggedIn={loggedIn} handleLogin={handleLogin} />} />
      <Route path = 'register' element = {<Register loggedIn={loggedIn} handleLogin={handleLogin}/>} />
      <Route path = 'store' element = {<Store loggedIn={loggedIn} handleLogin={handleLogin}/>} />
      <Route path = 'cart' element = {<Cart loggedIn={loggedIn} handleLogin={handleLogin}/>} />
    </Route>
  )
)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}



export default App
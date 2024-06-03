import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/registerCSS.css'

import {toast} from 'react-hot-toast';

const Login = ({loggedIn , handleLogin}) => {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
      setUsername(event.target.value);
    }
  
    const handlePassword = (event) => {
      setPassword(event.target.value);
    }
  
    function Login(){
      
      const data = {
        username : username, 
        password : password
      }
      console.log({newUserData : data});
      axios.post('http://localhost:3000/user/login' , data , { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log({"logger before :" : loggedIn});
        handleLogin();
        console.log({"acce ToKEN recieved :" : res.data.accessToken});
        // sessionStorage.setItem('accessToken', res.data.accessToken);
        // const accessToken = res.data.accessToken;
        // document.cookie = `accessToken=${accessToken}; path=/;`;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        // document.cookie = `accessToken=${accessToken}; path=/; expires=${expirationDate.toUTCString()}; domain=localhost; secure;`;
        console.log({"logger after  :" : loggedIn});
        toast.success("Login successfull !!")
        navigate('/store');
      })
      .catch((err) => {
        console.log("error mess is " + err);
      })
      setUsername("");
      setPassword("");
    }
  return (
    <div>
      <div className='container'>
          <h1 className='text-sky-400'>Login</h1>
          <input type="text" placeholder='Username' onChange={(event) = handleUsername} value={username}/>
          <input type="password" placeholder='password' onChange={(event) = handlePassword} value={password}/>
          <button className='button' onClick={Login}>Login</button>
      </div>
    </div>
  )
}

export default Login

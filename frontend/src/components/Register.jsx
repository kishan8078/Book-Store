import React, { useState } from 'react'
import axios from 'axios';
import '../css/registerCSS.css'
import { useNavigate } from 'react-router-dom';

import {toast} from 'react-hot-toast'

const Register = ({loggedIn , handleLogin}) => {

  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  function Register(){

    const data = {
      username : username, 
      password : password
    }
    console.log({newUserData : data});
    axios.post('http://localhost:3000/user/register' , data)
    .then((res) => {
      console.log(res);
      console.log({"logger  :" : loggedIn});
      handleLogin();
      toast.success('User Registered Successfully');
      navigate('/login')
    })
    .catch((err) => {
      console.log("error mess is" + err);
    })
    setUsername("");
    setPassword("");
  }


  return (
    
      <div className='container'>
        <h1>Register</h1>
        <input type="text" placeholder='Username' onChange={(event) = handleUsername} value={username}/>
        <input type="text" placeholder='password' onChange={(event) = handlePassword} value={password}/>
        <button className='button' onClick={Register}>Register</button>
      </div>
    
  )
}

export default Register

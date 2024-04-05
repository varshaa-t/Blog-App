import React, { useContext, useState } from 'react'
import {Navigate} from "react-router-dom";
import { UserContext } from '../UserContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(event){
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if(response.ok){
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    } else{
      alert('wrong credentials');
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input 
              type='text' 
              placeholder='email'
              value={email}
              onChange={event => setEmail(event.target.value)}  
            />
            <input 
              type='password' 
              placeholder='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button>Login</button>
        </form>
  )
}

export default LoginPage
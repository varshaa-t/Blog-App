import React, { useState } from 'react'
import toast from 'react-hot-toast'

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function register(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type':'application/json'}
        })
        if(response.status === 200){
            toast.success('Registration successful');
        } else{
            toast.error('Registration failed');
        }
    }

  return (
    <form className='register' onSubmit={register}>
        <h1>Register</h1>
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
        <button>Register</button>
    </form>
  )
}

export default RegisterPage
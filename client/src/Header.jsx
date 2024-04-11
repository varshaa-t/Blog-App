import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import toast from 'react-hot-toast'

function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, [])

  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    toast.success('Logged out successfully!')
  }

  const email = userInfo?.email;

  return (
    <header>
        <Link to="/" className="logo">My Blog</Link>
        <nav className='navbar'>
          {email && (
            <>
              <Link to='/create'>Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!email && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
  )
}

export default Header
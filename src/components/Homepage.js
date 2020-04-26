import React, { useState } from 'react';
import Login from './Login.js';
import Register from './Register.js';

const Homepage = () => {

  const [userClick, setUserClick] = useState(null);

  if (userClick === 'Login') {
    return <Login />
  }

  if (userClick === 'Register') {
    return <Register />
  }

  return (
    <div>
      <button name="button"
              onClick={() => setUserClick('Login')}>
                Login
      </button>
      <button name="button"
              onClick={() => setUserClick('Register')}>
                Register
      </button>    
    </div>
  )
};

export default Homepage;
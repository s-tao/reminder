import React, { useState } from 'react';

const Login = () => {

  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  }); 

  const handleChange = (evt) => setLoginState({
    ...loginState,
    [evt.target.name]: evt.target.value
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(loginState);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginState)
      })
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="text"
               name="email"
               value={loginState.email}
               onChange={handleChange}
               required />
      </div>
      <div>
        <label>Password</label>
        <input type="password"
               name="password"
               value={loginState.password}
               onChange={handleChange}
               required />
      </div>
      <button type="submit">Login</button>
    </form>
  )
};

export default Login;
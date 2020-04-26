import React, { useState } from 'react';
import TodoList from './TodoList.js';

const Login = () => {

  const initialState = {
    email: '',
    password: ''
  }  

  const [loginState, setLoginState] = useState(initialState); 

  const [loginSuccess, setLoginSuccess] = useState(false);


  const handleChange = (evt) => setLoginState({
    ...loginState,
    [evt.target.name]: evt.target.value
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(loginState);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginState)
      })
    .then(res => {
        if (!(res.ok)) {
          alert('Incorrect login or password.');
          setLoginState({...initialState})
        }
        else {
          setLoginSuccess(true); 
        }  
    });  
  };

  if (loginSuccess === true) {
    return <TodoList />
  }

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
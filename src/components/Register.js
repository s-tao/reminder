import React, { useState } from 'react';
import TodoList from './TodoList.js';

const Register = () => {
  
  // set initial state to clear out form if registration unsuccessful 
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  }

  const [registerFormState, setRegisterFormState] = useState(initialState);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleChange = (evt) => setRegisterFormState({
    ...registerFormState,
    [evt.target.name]: evt.target.value
    }
  );
  
  // sends and receive data from register route to check if user exist
  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormState)
      })
    .then(res => {
      if (!(res.ok)) {
        alert('User already exist. Please login.');
        // param needs to be iterable
        setRegisterFormState({...initialState})
      }
      else {
        setRegisterSuccess(true);
      }
    })
  };

  if (registerSuccess === true) {
    return <TodoList />
  }

  return ( 
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" 
               name="firstName" 
               value={registerFormState.firstName} 
               onChange={handleChange}
               required />
        <label>Last Name</label>
        <input type="text" 
               name="lastName" 
               value={registerFormState.lastName}
               onChange={handleChange}
               required />
      </div>
      <div>
        <label>Email</label>
        <input type="text" 
               name="email" 
               value={registerFormState.email}
               onChange={handleChange}
               required />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" 
               name="phone" 
               value={registerFormState.phone}
               onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" 
               name="password" 
               value={registerFormState.password}
               onChange={handleChange}
               required />
      </div>
      <button type="submit">Register</button> 
    </form>
  )
};

export default Register;
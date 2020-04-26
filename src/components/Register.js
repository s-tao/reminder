import React, { useState } from 'react';

const Register = () => {

  const [registerFormState, setRegisterFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (evt) => setRegisterFormState({
    ...registerFormState,
    [evt.target.name]: evt.target.value
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormState)
      })
   
  };


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
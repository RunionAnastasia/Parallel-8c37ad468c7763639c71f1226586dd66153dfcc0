// import React from 'react'
// import '././styles/SignUp.css'



// const SignUpForm = () => {
//   const [Email, setEmail ] = useState('')
//   const [Password, setPassword] = useState('')
//   return (
//     <div className='signup-container'>
//         <form className='signup-form'>
//             <h2>Sign Up</h2>
//             <label htmlFor='email'>Email</label>
//             <input type='email' id='email' name='email' required placeholder='Email'/>
//             <label htmlFor='password'>Password</label>
//             <input type='password' id='password' name='password' required placeholder='Password'/>
//             <button type='submit'>Sign Up</button> <br/>
//             <p> Already Registered? <link to='/login'>Login</link></p>
//         </form>
//     </div>
//   )
// }

// export default SignUpForm

// import React from 'react';
// import './styles/SignUp.css';
// import { Link } from 'react-router-dom';
// import {auth} from './firebase'
// import {createUserWithEmailAndPassword} from 'firebase/auth'

// const SignUpForm = () => {
//   const {Email, setEmail } = useState('')
//   const {Password, setPassword} = useState('')
//   const handleSumbit = (e) => {
//     e.preventDefault()
//       try {
//         createUserWithEmailAndPassword(auth, Email, Password)
//         console.log('User Created Successfully')
//       } catch (error) {
//         console.log(error)
//       }
//   }
//   return (
//     <div className='signup-container'>
//       <form className='signup-form' onSubmit={handleSumbit}>
//         <h2>Sign Up</h2>
//         <label htmlFor='email'>Email</label>
//         <input type='email' id='email' name='email' required placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
//         <label htmlFor='password'>Password</label>
//         <input type='password' id='password' name='password' required placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
//         <button type='submit'>Sign Up</button> <br />
//         <p>Already Registered? <Link to='/login'>Login</Link></p>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;


import React, { useState } from 'react';
import './styles/SignUp.css';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful sign up (e.g., redirect to login or home page)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Sign Up</button> <br/>
        <p>Already Registered? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
};

export default SignUpForm;
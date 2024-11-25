// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import SignUpForm from './SignUpForm'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Login from './login'

// function App() {
//   const [count, setCount] = useState(0)
 
//   return (
//     <>
//     <BrowserRouter> 
//       <Routes> 
//         <Route path='/signup' element={<SignUpForm />} />
//         <Route path='/login' element={<Login />} /> 
      
//       </Routes>
//     </BrowserRouter> 
//     </>
//   )
// }

// export default App

import { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import SignUpForm from './SignUpForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Header from './Header';
import ProfileView from './ProfileView';


function App() {
  return (
 
    <BrowserRouter> 
       <Header/> 
      <Routes> 
        <Route path='/' element={<LandingPage />} /> 
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/profileview' element={<ProfileView />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;


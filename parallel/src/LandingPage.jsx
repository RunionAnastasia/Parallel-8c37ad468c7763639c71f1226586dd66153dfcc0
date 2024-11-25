// import React from 'react'

// const LandingPage = () => {
//   return (
//     <div>
//       <h1>Landing Page</h1>
      
//     </div>
//   )
// }

// export default LandingPage

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Parallel</h1>
        <p>Join Parallel today.</p>
      </header>
      <main className="landing-main">
        <div className="landing-buttons">
          <Link to="/signup" className="btn btn-signup">Create Account</Link>
          <Link to="/login" className="btn btn-login">Log In</Link>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
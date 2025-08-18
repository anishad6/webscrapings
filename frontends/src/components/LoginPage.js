// import React from "react";
// import { saveToken } from "../auth";

// export default function LoginPage({ setIsLoggedIn }) {
//   function handleLogin() {
//     // Simulated login — replace with Google OAuth later
//     saveToken("sample-token");
//     setIsLoggedIn(true);
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// }


// import React, { useEffect } from 'react';

// const Login = ({ onLogin }) => {
//   useEffect(() => {
//     // Initialize Google Sign-In
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById('google-signin-button'),
//         {
//           theme: 'outline',
//           size: 'large',
//           width: '100%',
//         }
//       );
//     }
//   }, []);

//   const handleCredentialResponse = (response) => {
//     // Decode the JWT token to get user info
//     const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
//     const userData = {
//       id: payload.sub,
//       name: payload.name,
//       email: payload.email,
//       picture: payload.picture,
//       token: response.credential,
//     };

//     onLogin(userData);
//   };

//   const handleDemoLogin = () => {
//     // Demo user for testing without Google OAuth
//     const demoUser = {
//       id: 'demo',
//       name: 'Demo User',
//       email: 'demo@example.com',
//       picture: '/placeholder.svg?key=tqfsf',
//       token: 'demo-token',
//     };
//     onLogin(demoUser);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1 className="login-title">Web Scraping Portal</h1>
//         <p className="login-subtitle">
//           Sign in with Google to access your dashboard and view scraped data
//         </p>
        
//         <div id="google-signin-button" style={{ marginBottom: '1rem' }}></div>
        
//         <button className="demo-btn" onClick={handleDemoLogin}>
//           Continue with Demo Account
//         </button>
        
//         <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
//           Demo mode allows you to explore the interface without Google authentication
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React from "react";
import { saveToken } from "../auth";
import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";

export default function LoginPage({ setIsLoggedIn, setUser }) {
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      token: credentialResponse.credential
    };
    saveToken(credentialResponse.credential);
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Web Scraping Portal</h1>
        <p className="login-subtitle">Sign in to access the dashboard</p>
        
        <div className="google-login-btn">
          <GoogleLogin
            clientId="126474618620-l23p7893eu8uprgcfcuon1fsqvl1087g.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={ handleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
          {/* <GoogleLogin
            clientId="126474618620-l23p7893eu8uprgcfcuon1fsqvl1087g.apps.googleusercontent.com"
            buttonText="Login with Google"
            theme="outline"
            size="large"
            shape="rectangular"
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          /> */}
          {/* <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            useOneTap
          /> */}
        </div>
        
        <div className="login-features">
          <div className="feature">
            <span>🔍</span>
            <p>Scrape website data</p>
          </div>
          <div className="feature">
            <span>📊</span>
            <p>View results in beautiful cards</p>
          </div>
          <div className="feature">
            <span>🔒</span>
            <p>Secure Google authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
}

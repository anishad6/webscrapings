// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Navbar from './components/Navbar';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
// import Dashboard from './components/Dashboard';
// import './App.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//     {/* // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> */}
//     {/* // <GoogleOAuthProvider clientId="126474618620-l23p7893eu8uprgcfcuon1fsqvl1087g.apps.googleusercontent.com"> */}
//      {/* <GoogleOAuthProvider clientId="126474618620-l23p7893eu8uprgcfcuon1fsqvl1087g.apps.googleusercontent.com"> */}
//       <Router>
//         <div className="App">
//           <Navbar 
//             isLoggedIn={isLoggedIn} 
//             setIsLoggedIn={setIsLoggedIn} 
//             user={user} 
//           />
          
//           <Routes>
//             <Route 
//               path="/" 
//               element={<HomePage isLoggedIn={isLoggedIn} />} 
//             />
//             <Route 
//               path="/login" 
//               element={
//                 <LoginPage 
//                   setIsLoggedIn={setIsLoggedIn} 
//                   setUser={setUser} 
//                 />
//               } 
//             />
//             <Route 
//               path="/dashboard" 
//               element={
//                 isLoggedIn ? (
//                   <Dashboard user={user} />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               } 
//             />
//           </Routes>
//         </div>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './App.css';

// Fallback client ID for development


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user state
      setIsLoggedIn(true);
      // You would typically verify the token with your backend here
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <div className="App">
          <Navbar 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            user={user} 
            setUser={setUser}
          />
          
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route 
              path="/login" 
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage 
                    setIsLoggedIn={setIsLoggedIn} 
                    setUser={setUser} 
                  />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
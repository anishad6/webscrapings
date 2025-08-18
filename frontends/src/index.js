import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  // console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     {/* 
//       Replace 'your-google-client-id' with your actual Google OAuth client ID 
//       for the React-side Google Sign-In if you want to use it as a fallback
//     */}
//     <GoogleOAuthProvider clientId="your-google-client-id">
//       <App />
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
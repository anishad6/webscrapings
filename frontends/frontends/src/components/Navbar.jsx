import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../auth";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, setIsLoggedIn, user }) {
  function handleLogout() {
    logout();
    setIsLoggedIn(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          WebScraper
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <div className="user-dropdown">
                <img 
                  src={user?.picture} 
                  alt={user?.name} 
                  className="user-avatar"
                />
                <span className="user-name">{user?.name}</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
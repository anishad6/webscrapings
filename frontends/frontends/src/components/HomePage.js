import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage({ isLoggedIn }) {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Web Scraping Made Simple</h1>
        <p>Extract, analyze, and visualize web data with our powerful scraping tool</p>
        
        {!isLoggedIn ? (
          <Link to="/login" className="cta-button">
            Get Started - Login with Google
          </Link>
        ) : (
          <Link to="/dashboard" className="cta-button">
            Go to Dashboard
          </Link>
        )}
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Easy to Use</h3>
          <p>Simply enter a URL and let our tool do the rest</p>
        </div>
        <div className="feature-card">
          <h3>Beautiful Results</h3>
          <p>View scraped data in clean, organized cards</p>
        </div>
        <div className="feature-card">
          <h3>Secure</h3>
          <p>Protected with Google OAuth authentication</p>
        </div>
      </div>
    </div>
  );
}
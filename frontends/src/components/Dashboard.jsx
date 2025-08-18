// // import React, { useState } from "react";
// // import { scrapeWebsite } from "../api";

// // export default function Dashboard() {
// //   const [url, setUrl] = useState("");
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   async function handleScrape() {
// //     setLoading(true);
// //     const data = await scrapeWebsite(url);
// //     setResult(data);
// //     setLoading(false);
// //   }

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h1>Dashboard</h1>
// //       <input
// //         type="text"
// //         placeholder="Enter website URL"
// //         value={url}
// //         onChange={(e) => setUrl(e.target.value)}
// //         style={{ marginRight: "1rem", padding: "0.5rem" }}
// //       />
// //       <button onClick={handleScrape} disabled={loading}>
// //         {loading ? "Scraping..." : "Scrape"}
// //       </button>

// //       {result && (
// //         <div style={{ marginTop: "2rem" }}>
// //           <h3>Scrape Result:</h3>
// //           <pre>{JSON.stringify(result, null, 2)}</pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = ({ user, onLogout }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

//   useEffect(() => {
//     // Load data on component mount
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/scrape/`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//           'Content-Type': 'application/json',
//         },
//       });
      
//       setData(response.data.results || []);
//     } catch (err) {
//       console.error('Error fetching data:', err);
      
//       // For demo purposes, show mock data if API fails
//       if (user.id === 'demo') {
//         setData([
//           {
//             id: 1,
//             title: "Sample News Article 1",
//             url: "https://example.com/article1",
//             scraped_at: new Date().toISOString(),
//             source: "Demo Source"
//           },
//           {
//             id: 2,
//             title: "Sample News Article 2",
//             url: "https://example.com/article2",
//             scraped_at: new Date().toISOString(),
//             source: "Demo Source"
//           },
//           {
//             id: 3,
//             title: "Sample News Article 3",
//             url: "https://example.com/article3",
//             scraped_at: new Date().toISOString(),
//             source: "Demo Source"
//           }
//         ]);
//       } else {
//         setError('Failed to fetch data. Please check your connection and try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div>
//       {/* Header */}
//       <header className="header">
//         <div className="container">
//           <div className="header-content">
//             <div className="logo">Web Scraping Portal</div>
//             <div className="user-info">
//               <img 
//                 src={user.picture || "/placeholder.svg"} 
//                 alt={user.name}
//                 className="user-avatar"
//               />
//               <span>Welcome, {user.name}</span>
//               <button className="logout-btn" onClick={onLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Dashboard Content */}
//       <main className="dashboard">
//         <div className="container">
//           <div className="dashboard-header">
//             <h1 className="dashboard-title">Scraped Data Dashboard</h1>
//             <p className="dashboard-subtitle">
//               Latest scraped content from various sources
//             </p>
//           </div>

//           <div className="controls">
//             <button 
//               className="refresh-btn" 
//               onClick={fetchData}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <div className="spinner"></div>
//                   Refreshing...
//                 </>
//               ) : (
//                 <>
//                   🔄 Refresh Data
//                 </>
//               )}
//             </button>
//           </div>

//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}

//           {loading && data.length === 0 ? (
//             <div className="loading-container">
//               <div className="loading-spinner"></div>
//             </div>
//           ) : data.length > 0 ? (
//             <div className="data-grid">
//               {data.map((item) => (
//                 <div key={item.id} className="data-card">
//                   <h3 className="card-title">
//                     <a 
//                       href={item.url} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="card-link"
//                     >
//                       {item.title}
//                     </a>
//                   </h3>
//                   <div className="card-meta">
//                     <p><strong>Source:</strong> {item.source || 'Unknown'}</p>
//                     <p><strong>Scraped:</strong> {formatDate(item.scraped_at)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="no-data">
//               <div className="no-data-icon">📄</div>
//               <h3>No data available</h3>
//               <p>Click "Refresh Data" to fetch the latest content</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState } from "react";
import { scrapeWebsite } from "../api";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleScrape() {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await scrapeWebsite(url);
      setResults(prev => [...prev, { ...data, id: Date.now() }]);
    } catch (err) {
      setError("Failed to scrape website. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Enter a URL to scrape content</p>
      </div>
      
      <div className="scrape-controls">
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <button 
          onClick={handleScrape} 
          disabled={loading}
          className="scrape-button"
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            "Scrape Website"
          )}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="results-grid">
        {results.map((result) => (
          <div key={result.id} className="result-card">
            <h3 className="card-title">
              <a 
                href={result.url || url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {result.title || "Scraped Content"}
              </a>
            </h3>
            <div className="card-content">
              {result.text && (
                <p className="card-text">
                  {result.text.length > 150 
                    ? `${result.text.substring(0, 150)}...` 
                    : result.text}
                </p>
              )}
              {result.images && result.images.length > 0 && (
                <div className="card-images">
                  {result.images.slice(0, 3).map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`From ${url}`} 
                      className="thumbnail"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="card-footer">
              <span className="timestamp">
                {new Date().toLocaleTimeString()}
              </span>
              <a 
                href={result.url || url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="visit-link"
              >
                Visit Site
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {results.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No scraped results yet</h3>
          <p>Enter a URL above to start scraping</p>
        </div>
      )}
    </div>
  );
}
// const BASE_URL = "http://localhost:8000/api";

// export async function scrapeWebsite(url) {
//   const token = localStorage.getItem("token");
//   const res = await fetch(`${BASE_URL}/scrape/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ url })
//   });
//   return await res.json();
// }

const BASE_URL = "http://127.0.0.1:8000/api";

export async function getCSRFToken() {
  try {
    const response = await fetch(`${BASE_URL}/csrf/`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`CSRF endpoint responded with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    throw new Error("Failed to get security token. Please refresh the page.");
  }
}

export async function scrapeWebsite(url) {
  try {
    // Get CSRF token and use it
    const csrfToken = await getCSRFToken();
    
    const response = await fetch(`${BASE_URL}/scrape/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,  // Use the token value here
      },
      credentials: 'include',
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Scraping failed:", error);
    throw new Error("Failed to connect to the scraping service. Please try again.");
  }
}
// frontend/src/auth.js

// Save token after login
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Example API call
export const scrapeWebsite = async (url) => {
  const token = getToken();
  const response = await fetch("http://localhost:8000/api/scrape-jobs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  });

  return await response.json();
};

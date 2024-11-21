// src/api.js

const apiFetch = async (endpoint, options = {}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  export default apiFetch;
  
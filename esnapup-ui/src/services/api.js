const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  
  post: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  
  // Add other methods as needed (PUT, DELETE, etc.)
};
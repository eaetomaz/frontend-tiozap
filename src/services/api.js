const API_URL = 'http://localhost:3001';

export async function apiFetch(endpoint, options = {}) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikd1aWxoZXJtZSIsImlhdCI6MTc1NDg0MjE3MywiZXhwIjoxNzU0ODQ1NzczfQ.IMc_M3HPMnkU-w_wk4TROGC_8EtQ4-Yh4ikqmTdYecs';

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });  

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  return response.json();
}

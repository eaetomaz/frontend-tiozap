const API_URL = 'http://localhost:3001';

export async function apiFetch(endpoint, options = {}) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikd1aWxoZXJtZSIsImlhdCI6MTc1NDg1MzU0NCwiZXhwIjoxNzU0ODU3MTQ0fQ.qhVTatM5HU4qarlraXUekyRNTJ-EphgMKxw_Kt_InaU';

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

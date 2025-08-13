const API_URL = 'http://localhost:3001';

export async function apiFetch(endpoint, options = {}) {
  const token = await getValidToken();

  console.log(token);

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`   
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });  

  console.log('Requisição:', {
  url: `${API_URL}${endpoint}`,
  method: options.method || 'GET',
  headers
});

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  return response.json();  
}

function isTokenValid(token) {
  try {
    const[, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() /1000);
    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
}

async function fetchNewToken() {
  const response = await fetch('http://localhost:3001/auth', {
    method: 'GET'
  });

  if(!response.ok)
    throw new Error(`Erro ao obter novo token: ${Response.status}`);

  const data = await response.json();

  document.cookie = `authToken=${data.token}; path=/; Secure; SameSite=Strict`;
  return data.token;
}

async function getValidToken() {
  const token = getCookie('authToken');

  if(token && isTokenValid(token)) {
    return token;
  }    

  return await fetchNewToken();
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

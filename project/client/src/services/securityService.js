export const login = async function login(email, password) {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (response.status === 422) {
    throw await response.json();
  } else if (!response.ok) {
    throw new Error('Fetch failed');
  }
  return (await response.json()).token;
};

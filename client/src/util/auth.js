
const getAuth = async () => {
  const member = localStorage.getItem('token'); // Get the token directly
  if (member) {
    const decodedToken = await decodeTokenPayload(member); // Decode the JWT
    return {
      token: member,
      role: decodedToken.role,
      username: decodedToken.username,
    };
  } else {
    return {};
  }
};

// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;
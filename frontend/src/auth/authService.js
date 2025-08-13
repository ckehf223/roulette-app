import { setAccessToken, removeAccessToken } from '/src/auth/Auth';
import instance from '/src/auth/axios';

export const login = async (username, password) => {
  try {
    const response = await instance.post('/login', { username, password }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.headers['authorization']) {
      throw new Error('Authorization header is missing in the response');
    }
    const accessToken = response.headers['authorization'];
    setAccessToken(accessToken);
    return response;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await instance.post('/logout', {}, { withCredentials: true });
    removeAccessToken();
    window.location.href = "/";
  } catch (error) {
    console.error('Logout failed', error);
  }
};

export const adminLogout = async () => {
  try {
    await instance.post('/logout', {}, { withCredentials: true });
    removeAccessToken();
    window.location.href = "/admin/login";
  } catch (error) {
    console.error('Logout failed', error);
  }
};
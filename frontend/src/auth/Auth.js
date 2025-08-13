const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const clearRefreshToken = () => {
document.cookie = 'refresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
};
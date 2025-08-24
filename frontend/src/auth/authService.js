import {
  setAccessToken,
  removeAccessToken,
  clearRefreshToken,
} from "/src/auth/Auth";
import { useAuth } from "/src/common/AuthContext";
import instance from "/src/auth/axios";

export const login = async (username, password) => {
  try {
    const response = await instance.post(
      "/auth/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.data["accessToken"]) {
      throw new Error("Authorization header is missing in the response");
    }
    const accessToken = response.data["accessToken"];
    setAccessToken(accessToken);
    return response;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    removeAccessToken();
    clearRefreshToken();
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const adminLogout = async () => {
  try {
    await instance.post("/logout", {}, { withCredentials: true });
    removeAccessToken();
    window.location.href = "/admin/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

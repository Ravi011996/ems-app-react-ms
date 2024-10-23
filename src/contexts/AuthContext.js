import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { data } = response;

      if (response.status === 200) {
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {

      return { error: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      return { success: true };
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ login,register,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Create a provider for the context
export const AuthProvider = ({ children }) => {
  const validCredentials = JSON.parse(process.env.REACT_APP_VALID_CREDENTIALS);

  const [user, setUser] = useState(null);

  // Load user from localStorage if available
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser); // Try parsing the stored user data
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error); // Log the error
      localStorage.removeItem("user"); // Remove corrupted data if any
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ validCredentials, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

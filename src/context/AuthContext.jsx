import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Create a provider for the context
export const AuthProvider = ({ children }) => {

    const validCredentials = [
        { email: 'thakardevam@gmail.com', password: 'adminadmin', Name: "Devam", Role: "Developer" },
        { email: 'harshang.developer@gmail.com', password: 'adminadmin', Name: "Harshang", Role: "Developer" },
        { email: 'harshitabharadwaj@gmail.com', password: 'Harsita@0319', Name: "Harshita", Role: "Designer" },
        { email: 'ritikaanupam@gmail.com', password: 'Ritika@1311', Name: "Ritika", Role: "Designer" },
        { email: 'poooja007@gmail.com', password: 'pooja@1234', Name: "Pooja", Role: "Designer" },
        { email: 'Mayuraestin@gmail.com', password: 'Aestin@1211', Name: "Mayur", Role: "Manager" },
    ];

    const [user, setUser] = useState(null);

    // Load user from localStorage if available
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser); // Try parsing the stored user data
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Error reading from localStorage:", error); // Log the error
            localStorage.removeItem('user'); // Remove corrupted data if any
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove from localStorage
    };

    return (
        <AuthContext.Provider value={{ validCredentials, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

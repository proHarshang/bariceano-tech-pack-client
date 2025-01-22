import React from 'react';
import { Navigate } from 'react-router-dom';
import { TechPackProvider } from '../context/TechPackContext';

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('user');

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <TechPackProvider>{children}</TechPackProvider>;
};

export default PrivateRoute;
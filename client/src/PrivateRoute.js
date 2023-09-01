import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, ...rest }) {
  const token = localStorage.getItem('userToken');

  // If token exists, allow the route, otherwise redirect to login.
  return token 
    ? <Route {...rest} element={element} />
    : <Navigate to="/login" />;
}

export default PrivateRoute;

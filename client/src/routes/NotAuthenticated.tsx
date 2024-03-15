import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

console.log(React.version);

const NotAuthenticated = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  );
};

export default NotAuthenticated;

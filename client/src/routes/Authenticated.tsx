import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ListUsers from '../pages/ListUsers';
import Register from '../pages/Register';

console.log(React.version);

const Authenticated = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users' element={<ListUsers />} />
      <Route path='/edit/:id' element={<Register />} />
    </Routes>
  );
};

export default Authenticated;

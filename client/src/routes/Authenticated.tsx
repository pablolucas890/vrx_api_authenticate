import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ListUsers from '../pages/ListUsers';
import Register from '../pages/Register';
import Textures from '../pages/Textures';

console.log(React.version);

const Authenticated = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users' element={<ListUsers />} />
      <Route path='/edit' element={<Register />} />
      <Route path='/textures' element={<Textures />} />
    </Routes>
  );
};

export default Authenticated;

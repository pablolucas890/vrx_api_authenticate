import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Register from '../components/Register';
import Home from '../components/Home';
import ListUsers from '../components/ListUsers';

const ListRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users' element={<ListUsers />} />
    </Routes>
  );
};

export default ListRoutes;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ListRoutes from './routes';

console.log(React.version);

function App() {
  return (
    <BrowserRouter>
      <ListRoutes />
    </BrowserRouter>
  );
}

export default App;

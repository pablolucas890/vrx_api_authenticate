import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SERVER_HOST, SERVER_PORT } from './global/utils';
import Authenticated from './routes/Authenticated';
import NotAuthenticated from './routes/NotAuthenticated';

function App() {
  const [authentecated, setAuthentecated] = React.useState(false);
  const USERNAME = localStorage.getItem('username');
  const PASSWORD = localStorage.getItem('password');

  React.useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/users`, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD) },
    }).then(response => setAuthentecated(response.status === 401));
  }, []);

  return <BrowserRouter>{authentecated ? <Authenticated /> : <NotAuthenticated />}</BrowserRouter>;
}

export default App;

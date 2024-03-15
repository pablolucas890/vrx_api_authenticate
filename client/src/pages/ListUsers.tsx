import React from 'react';
import { Users } from '../global/props';
import { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } from '../global/utils';

function ListUsers() {
  const [users, setUsers] = React.useState<Users[]>([]);
  const USERNAME = localStorage.getItem('username');
  const PASSWORD = localStorage.getItem('password');

  React.useEffect(() => {
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }, []);

  function handleDelete(id?: number) {
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }

  return (
    <div className='users'>
      <h1>Usuários</h1>
      <ul id='users-list'>
        {users.map(user => {
          return (
            <li key={user.id}>
              {user.email}
              <button onClick={() => handleDelete(user.id)}>Deletar</button>
            </li>
          );
        })}
      </ul>
      <a href='/'>Voltar</a>
    </div>
  );
}

export default ListUsers;

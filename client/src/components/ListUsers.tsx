import React from 'react';
import { PASSWORD, USERNAME } from '../global/auth';
import { Users } from '../global/props';
import { SERVER_HOST, SERVER_PORT } from '../global/utils';

function ListUsers() {
  const [users, setUsers] = React.useState<Users[]>([]);

  React.useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/users`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  function handleDelete(id?: number) {
    console.log(id);
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
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

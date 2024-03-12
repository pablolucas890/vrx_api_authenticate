import React from 'react';
import { PASSWORD, USERNAME } from '../global/auth';
import { SERVER_HOST, SERVER_PORT } from '../global/utils';

export function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit() {
    console.log(name, email, password);
    await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      });
  }

  return (
    <div className='register'>
      <h1>Criar usuário</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Nome</label>
        <input type='text' name='name' id='name' value={name} onChange={e => setName(e.target.value)} />
        <br />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Criar</button>
        <a href='/'>Voltar</a>
      </form>
    </div>
  );
}

export default Register;

import React from 'react';

export function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit() {
    if (username === '' || password === '') return;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    window.location.href = '/';
  }
  
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor='username'>Usuário</label>
        <input className='border-4' type='text' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          id='password'
          name='password'
          className='border-4'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className='border-4' type='submit' onClick={handleSubmit}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;

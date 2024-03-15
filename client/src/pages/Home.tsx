import React from 'react';

console.log(React.version);

export function Home() {
  return (
    <div className='bg-slate-700 text-white p-4'>
      <h1> Sistema de Cadastro de Usuários da VRX</h1>
      <li>
        <a href='/register'>Cadastrar</a>
      </li>
      <li>
        <a href='/users'>Listar</a>
      </li>
    </div>
  );
}

export default Home;

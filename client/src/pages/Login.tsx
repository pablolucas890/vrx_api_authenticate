import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleLogin() {
    if (!email || !password) return;
    localStorage.setItem('username', email);
    localStorage.setItem('password', password);
    window.location.href = '/';
  }

  return (
    <div className='flex'>
      <div className='md:w-2/4 h-screen bg-gradient-to-t from-primary-450 to-primary-500 flex items-center justify-center'>
        <img src='logologin.png' alt='Login' className='w-2/5' />
      </div>
      <div className='md:w-2/4 sm:w-full h-screen items-center justify-center flex'>
        <div className='gap-4'>
          <Title title='Login' className='mb-2' />
          <SubTitle title='Por favor, insira abaixo seu usuário e senha' className='mb-4' />
          <Input
            placeholder='E-mail'
            active={email != ''}
            icon='user'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && handleLogin()}
            className='mb-4 w-[300px]'
          />
          <Input
            placeholder='Senha'
            active={password !== ''}
            icon='lock'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && handleLogin()}
            className='mb-6 w-[300px]'
          />
          <Button
            onClick={handleLogin}
            hasIcon
            active={email !== '' && password !== ''}
            title='Entrar'
            className='float-right mb-6'
          />
        </div>
      </div>
    </div>
  );
}

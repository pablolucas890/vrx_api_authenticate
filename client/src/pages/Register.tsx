import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Content from '../components/Content';
import Input from '../components/Input';
import SideBar from '../components/SideBar';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import {
  SERVER_HOST,
  SERVER_PORT,
  SERVER_PROTOCOL,
  verifyConfirmPassword,
  verifyEmail,
  verifyName,
  verifyPassword,
  verifyPhone,
} from '../global/utils';

export function Register() {
  const { id } = useParams();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [submitEnabled, setSubmitEnabled] = React.useState(false);

  const USERNAME = localStorage.getItem('username');
  const PASSWORD = localStorage.getItem('password');

  React.useEffect(() => {
    if (!id) return;
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(async res => {
        const json = await res.json();
        setName(json.name);
        setEmail(json.email);
        setPhone(json.phone);
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }, []);

  React.useEffect(() => {
    setSubmitEnabled(
      verifyName(name) &&
        verifyEmail(email) &&
        verifyPhone(phone) &&
        verifyPassword(password) &&
        verifyConfirmPassword(password, confirmPassword),
    );
  }, [name, email, phone, password, confirmPassword]);

  async function handleSubmit() {
    if (!submitEnabled) return;

    await fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
      body: JSON.stringify({ id, name, email, phone, password }),
    })
      .then(async res => {
        const json = await res.json();
        if (json.error) alert(json.error);
        alert('Usuário cadastrado com sucesso');
        window.location.href = '/';
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }

  return (
    <div className='flex'>
      <SideBar pageSelected='register' />
      <Content className='flex gap-4'>
        <Title title='Cadastrar usuário' />
        <SubTitle title='Preencha os campos abaixo para cadastrar um novo usuário' />
        <div className='gap-4 flex flex-col w-full px-72'>
          <Input
            className={clsx('bg-white w-full', !verifyName(name) && 'text-red-600 outline-red-600')}
            placeholder='Nome Completo'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            active={name.length > 0}
          />
          <Input
            className={clsx('bg-white w-full', !verifyEmail(email) && 'text-red-600 outline-red-600')}
            placeholder='Email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            active={email.length > 0}
          />
          <Input
            className={clsx('bg-white w-full', !verifyPhone(phone) && 'text-red-600 outline-red-600')}
            placeholder='Telefone'
            type='phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            active={phone.length > 0}
          />
          <Input
            className={clsx('bg-white w-full', !verifyPassword(password) && 'text-red-600 outline-red-600')}
            placeholder='Senha'
            icon='lock'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            active={password.length > 0}
          />
          <Input
            className={clsx(
              'bg-white w-full',
              !verifyConfirmPassword(password, confirmPassword) && 'text-red-600 outline-red-600',
            )}
            placeholder='Confirmar Senha'
            icon='lock'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            active={confirmPassword.length > 0}
          />
          <Button title='Cadastrar' type='submit' active={submitEnabled} onClick={handleSubmit} className='float-end' />
        </div>
      </Content>
    </div>
  );
}

export default Register;

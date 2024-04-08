import clsx from 'clsx';
import React from 'react';
import { CgHome } from 'react-icons/cg';
import { FiUserPlus } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { MdOutlineTexture } from 'react-icons/md';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { hoverClassName } from '../global/utils';
import SubTitle from './SubTitle';

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  pageSelected: 'home' | 'register' | 'users' | 'textures';
}

export default function SideBar({ pageSelected, ...rest }: SideBarProps) {
  const { className, ...props } = rest;

  return (
    <div {...props} className={clsx('w-20 bg-white h-screen items-center', className)}>
      <a href='/'>
        <img src='logo512.png' alt='Logo' className='w-10 h-10 rounded-full my-4 ml-4' />
      </a>
      <hr className='border-secondary-300 mx-2 my-4 border-t-2' />
      <div className='flex flex-col items-center h-20 justify-center'>
        <CgHome
          className={clsx(
            'text-2xl duration-300 cursor-pointer',
            hoverClassName,
            pageSelected === 'home' ? 'text-primary-500' : 'text-secondary-600',
          )}
          onClick={() => (window.location.href = '/')}
        />
      </div>
      <div className='flex flex-col items-center h-20 justify-center'>
        <FiUserPlus
          className={clsx(
            'text-2xl duration-300 cursor-pointer',
            hoverClassName,
            pageSelected === 'register' ? 'text-primary-500' : 'text-secondary-600',
          )}
          onClick={() => (window.location.href = '/register')}
        />
      </div>
      <div className='flex flex-col items-center h-20 justify-center'>
        <GrGroup
          className={clsx(
            'text-2xl duration-300 cursor-pointer',
            hoverClassName,
            pageSelected === 'users' ? 'text-primary-500' : 'text-secondary-600',
          )}
          onClick={() => (window.location.href = '/users')}
        />
      </div>
      <div className='flex flex-col items-center h-20 justify-center'>
        <MdOutlineTexture
          className={clsx(
            'text-2xl duration-300 cursor-pointer',
            hoverClassName,
            pageSelected === 'textures' ? 'text-primary-500' : 'text-secondary-600',
          )}
          onClick={() => (window.location.href = '/textures')}
        />
      </div>
      <hr className='border-secondary-300 mx-2 my-4' />
      <div className='flex flex-col items-center h-20 justify-center absolute bottom-0 left-5'>
        <RiLogoutCircleLine
          className={clsx('text-primary-500 text-3xl duration-300 cursor-pointer', hoverClassName)}
          onClick={() => {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            window.location.href = '/';
          }}
        />
        <SubTitle title='Sair' className='text-xs mt-2' />
      </div>
    </div>
  );
}

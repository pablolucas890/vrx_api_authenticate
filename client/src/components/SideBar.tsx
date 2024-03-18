import clsx from 'clsx';
import React from 'react';
import { CgHome } from 'react-icons/cg';
import { FiUserPlus } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { hoverClassName } from '../global/utils';

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideBar({ ...rest }: SideBarProps) {
  const { className, ...props } = rest;

  return (
    <div {...props} className={clsx('w-20 bg-white h-screen', className)}>
      <div className='flex flex-col items-center h-20 justify-center'>
        <RiLogoutCircleLine
          className={clsx('text-primary-500 text-3xl duration-300 cursor-pointer', hoverClassName)}
          onClick={() => {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            window.location.href = '/';
          }}
        />
      </div>
      <hr className='border-secondary-300 mx-2 my-4' />
      <div className='flex flex-col items-center h-20 justify-center'>
        <CgHome
          className={clsx('text-primary-500 text-3xl duration-300 cursor-pointer', hoverClassName)}
          onClick={() => (window.location.href = '/')}
        />
      </div>
      <div className='flex flex-col items-center h-20 justify-center'>
        <FiUserPlus
          className={clsx('text-primary-500 text-3xl duration-300 cursor-pointer', hoverClassName)}
          onClick={() => (window.location.href = '/register')}
        />
      </div>
      <div className='flex flex-col items-center h-20 justify-center'>
        <GrGroup
          className={clsx('text-primary-500 text-3xl duration-300 cursor-pointer', hoverClassName)}
          onClick={() => (window.location.href = '/users')}
        />
      </div>
    </div>
  );
}

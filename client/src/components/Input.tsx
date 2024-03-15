import clsx from 'clsx';
import React from 'react';
import { FaLock, FaUnlock, FaUser } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: 'user' | 'lock';
  active?: boolean;
}

export default function Input({ icon, active, ...rest }: InputProps) {
  const { className, type, ...props } = rest;
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const Icon = icon === 'user' ? FaUser : passwordVisible ? FaUnlock : FaLock;

  return (
    <div className='relative'>
      <input
        className={clsx(
          'text-center bg-secondary-100 font-poopins p-3 border-secondary-300 rounded-md border-0 w-200',
          active ? 'text-primary-450' : 'text-secondary-300',
          className,
        )}
        type={icon === 'lock' ? (passwordVisible ? 'text' : 'password') : type}
        {...props}
      />
      <Icon
        onClick={() => icon == 'lock' && setPasswordVisible(!passwordVisible)}
        className={clsx('absolute top-4 left-4', active ? 'text-primary-450' : 'text-secondary-600')}
      />
    </div>
  );
}

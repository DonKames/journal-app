import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h3 className='auth__title'>Registrar</h3>
      <form>
        <input
          type='text'
          placeholder='Nombre'
          name='name'
          className='auth__input'
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='E-mail'
          name='email'
          className='auth__input'
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Contraseña'
          name='password'
          className='auth__input'
          autoComplete='current-password'
        />
        <input
          type='password'
          placeholder='Re-Contraseña'
          name='repassword'
          className='auth__input'
          autoComplete='current-password'
        />
        <button
          className='mb-5 btn btn-primary btn-block'
          type='submit'
        >
          Ingresar
        </button>
        <div className='mb-5'></div>
        <Link
          className='link mt-5'
          to="/auth/login"
        >
          Ya registrado?
        </Link>
      </form>
    </>
  );
};

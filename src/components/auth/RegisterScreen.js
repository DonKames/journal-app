import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterNameEmailPass } from '../../actions/auth';

export const RegisterScreen = () => {

  /*
  {
    name: 'Kames',
    email: 'camio@gmail.com',
    password: '123456',
    re-password: '123456'
  }

  //useForm

  const  handleRegister = (e) => {
    console.log(name, email, password, re-password)
  }
  */

  const dispatch = useDispatch();

  const { msgError } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: 'kames',
    email: 'camilo@hotmail.com',
    password: '123456',
    repassword: '123456'
  });

  const { name, email, password, repassword } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch( startRegisterNameEmailPass( name, email, password ) );
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {

      const msgError = 'El nombre es Requerido';
      dispatch(setError(msgError));
      return false;

    } else if (!validator.isEmail(email)) {

      const msgError = 'Email Invalido';
      dispatch(setError(msgError));
      return false;

    } else if (password !== repassword || password.length < 5) {

      const msgError = 'Las passwords no son iguales o tienen menos de 6 caracteres.';
      dispatch(setError(msgError));
      return false;

    }

    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className='auth__title'>Registrar</h3>
      <form
        onSubmit={handleRegister}
        className='animate__animated animate__fadeIn animate__faster'
      >
        {
          msgError &&
          (
            <div className='auth__alert-error'>
              {msgError}
            </div>
          )
        }

        <input
          type='text'
          placeholder='Nombre'
          name='name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='E-mail'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Contraseña'
          name='password'
          className='auth__input'
          autoComplete='current-password'
          value={password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Re-Contraseña'
          name='repassword'
          className='auth__input'
          autoComplete='current-password'
          value={repassword}
          onChange={handleInputChange}
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

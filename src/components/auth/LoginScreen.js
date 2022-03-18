import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    email: 'camilo@hotmail.com',
    password: '123456'
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword( email, password ) );
  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form
        onSubmit={handleLogin}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <input
          type='text'
          placeholder='E-mail'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={ email }
          onChange={ handleInputChange }
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          autoComplete='current-password'
          value={ password }
          onChange={ handleInputChange }
        />
        <button
          className='btn btn-primary btn-block'
          type='submit'
          disabled={loading}
        >
          Ingresar
        </button>
        <hr />
        <div className='auth__social-networks'>
          <p>Ingresa con tu cuenta de:</p>
          <div
            className="google-btn"
            onClick={ handleGoogleLogin }
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Ingresar con GOOGLE</b>
            </p>
          </div>
        </div>
        <Link
          className='link'
          to="/auth/register"
        >
          Crear nueva Cuenta
        </Link>
      </form>
    </>
  )
};

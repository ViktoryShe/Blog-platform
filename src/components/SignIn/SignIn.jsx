import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { clearError, fetchUserLogin } from '../../store/fetchSlice'

import classes from './SignIn.module.scss'

export default function SignIn() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const { loading, error } = useAppSelector((state) => state.fetchReducer) || {}
  const navigate = useNavigate()
  const [passwordError, setPasswordError] = useState(null)

  const {
    register,
    formState: { errors, submitCount, isSubmitting },
    handleSubmit,
  } = useForm()

  useEffect(() => {
    if (submitCount && !error && !loading && !isSubmitting && !Object.keys(errors).length) {
      navigate('/')
    }
  }, [isSubmitting, loading])

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        fetchUserLogin({
          user: {
            email: data.email,
            password: data.password,
          },
        })
      )

      if (fetchUserLogin.rejected.match(resultAction)) {
        if (resultAction.payload === 'Error, email or password is invalid') {
          setPasswordError('Неверный email или пароль')
        } else {
          setPasswordError('Не удалось войти. Пожалуйста, попробуйте снова')
        }
      }
    } catch (err) {
      setPasswordError(`Ошибка при отправке данных: ${err}`)
    }
  }

  function inputClasses(input) {
    return classNames(classes['form-sign-in-input'], {
      [classes['form-sign-in-input--warning']]: errors[input],
    })
  }

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div className={classes['form-wrap']}>
      <form className={classes['form-sign-in']} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes['form-sign-in-title']}>Sign In</h2>
        <fieldset className={classes['form-sign-in-inputs']}>
          <label className={classes['form-sign-in-label']}>
            Email address
            <input
              {...register('email', {
                required: 'Поле Email обязательно к заполнению',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'Please enter valid email!',
                },
              })}
              placeholder="Email address"
              className={inputClasses('email')}
              type="email"
            />
          </label>
          {errors.email && (
            <span className={classes['form-sign-in-error']}>{errors.email.message}</span>
          )}
          <span className={classes['form-sign-in-error']}>{passwordError}</span>

          <label className={classes['form-sign-in-label']}>
            Password
            <input
              {...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символов',
                },
                pattern: {
                  value: /^(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*\d*)[^\s]{6,40}$/i,
                  message: 'Please enter valid password!',
                },
                onChange: () => dispatch(clearError('password')),
              })}
              placeholder="Password"
              className={inputClasses('password')}
              type="password"
            />
          </label>
          {errors.password && (
            <span className={classes['form-sign-in-error']}>
              {errors.password.message}
            </span>
          )}
        </fieldset>
        <button
          onClick={() => dispatch(clearError('all'))}
          className={classes['form-sign-in-button']}
          type="submit"
        >
          Login
        </button>
        <span className={classes['form-sign-in-span']}>
          Don’t have an account?
          <Link className={classes['form-sign-in-link']} to="/sign-up">
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  )
}
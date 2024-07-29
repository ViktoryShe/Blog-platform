import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import classes from './SignUp.module.scss'

export default function SignUp() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <div className={classes['form-wrap']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['form-sign-up']}>
        <h2 className={classes['form-sign-up-title']}>Create new account</h2>
        
        <label className={classes['form-sign-up-label']}>
          Username
          <input
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов',
              },
            })}
            placeholder="Username"
            className={classes['form-sign-up-input']}
          />
        </label>
        {errors.username && <span>{errors.username.message}</span>}

        <label className={classes['form-sign-up-label']}>
          Email address
          <input
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат email',
              },
            })}
            placeholder="Email address"
            className={classes['form-sign-up-input']}
            type="email"
          />
        </label>
        {errors.email && <span>{errors.email.message}</span>}

        <label className={classes['form-sign-up-label']}>
          Password
          <input
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
            })}
            placeholder="Password"
            className={classes['form-sign-up-input']}
            type="password"
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}

        <label className={classes['form-sign-up-label']}>
          Repeat Password
          <input
            {...register('repeatPassword', {
              required: 'Поле обязательно к заполнению',
              validate: (value) => value === getValues('password') || 'Пароли не совпадают',
            })}
            placeholder="Password"
            className={classes['form-sign-up-input']}
            type="password"
          />
        </label>
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}

        <label className={classes['form-sign-up-checkbox']}>
          <input
            {...register('terms', {
              required: 'Вы должны согласиться с условиями',
            })}
            className={classes['form-sign-up-checkbox-input']}
            type="checkbox"
          />
          <span className={classes['form-sign-up-checkbox-text']}>
            I agree to the processing of my personal information
          </span>
        </label>
        {errors.terms && <span>{errors.terms.message}</span>}

        <button className={classes['form-sign-up-button']} type="submit" disabled={!isValid}>
          Create
        </button>
        <span className={classes['form-sign-up-span']}>
          Already have an account?
          <Link className={classes['form-sign-up-link']} to="/sign-in">
            {' '}
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  )
}

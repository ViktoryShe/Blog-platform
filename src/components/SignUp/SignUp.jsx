import React, { useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCreateUser, clearError } from '../../store/fetchSlice'

import classes from './SignUp.module.scss'

export default function SignUp() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const { loading, error } = useAppSelector((state) => state.fetchReducer) || {}
  const navigate = useNavigate()
  
  const {
    register,
    formState: { errors, submitCount, isSubmitting },
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(
      fetchCreateUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      })
    )
  }

  useEffect(() => {
    if (submitCount && !error && !loading && !isSubmitting && !Object.keys(errors).length) {
      navigate('/')
    }
  }, [isSubmitting, loading])

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className={classes['form-wrap']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['form-sign-up']}>
        <h2 className={classes['form-sign-up-title']}>Create new account</h2>
        <fieldset className={classes['form-sign-up-inputs']}>
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
                pattern: {
                  value: /^[a-z0-9_-]{3,20}$/,
                  message: 'Please enter valid username!',
                },
                onChange: () => dispatch(clearError('username')),
              })}
              placeholder="Username"
              className={classNames(classes['form-sign-up-input'], {
                [classes['form-sign-up-input--warning']]: errors.username,
              })}
              type="text"
            />
          </label>
          {errors.username && (
            <span className={classes['form-sign-up-error']}>{errors.username.message}</span>
          )}
          {error?.username && (
            <span className={classes['form-sign-up-error']}>Username уже существует</span>
          )}

          <label className={classes['form-sign-up-label']}>
            Email address
            <input
              {...register('email', {
                required: 'Поле Email обязательно к заполнению',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'Please enter valid email!',
                },
                onChange: () => dispatch(clearError('email')),
              })}
              placeholder="Email address"
              className={classNames(classes['form-sign-up-input'], {
                [classes['form-sign-up-input--warning']]: errors.email,
              })}
              type="email"
            />
          </label>
          {errors.email && (
            <span className={classes['form-sign-up-error']}>{errors.email.message}</span>
          )}
          {error?.email && (
            <span className={classes['form-sign-up-error']}>Email уже существует</span>
          )}

          <label className={classes['form-sign-up-label']}>
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
              })}
              placeholder="Password"
              className={classNames(classes['form-sign-up-input'], {
                [classes['form-sign-up-input--warning']]: errors.password,
              })}
              type="password"
            />
          </label>
          {errors.password && (
            <span className={classes['form-sign-up-error']}>{errors.password.message}</span>
          )}

          <label className={classes['form-sign-up-label']}>
            Repeat Password
            <input
              {...register('repeatPassword', {
                required: 'Поле обязательно к заполнению',
                validate: (value) => value === watch('password') || 'The passwords do not match',
              })}
              placeholder="Password"
              className={classNames(classes['form-sign-up-input'], {
                [classes['form-sign-up-input--warning']]: errors.repeatPassword,
              })}
              type="password"
            />
          </label>
          {errors.repeatPassword && (
            <span className={classes['form-sign-up-error']}>{errors.repeatPassword.message}</span>
          )}

          <label className={classes['form-sign-up-label-checkbox']}>
            <input
              {...register('agreement', {
                required: 'Подтвердите согласие',
              })}
              type="checkbox"
            />
            I agree to the processing of my personal information
          </label>
          {errors.agreement && (
            <span className={classes['form-sign-up-error']}>{errors.agreement.message}</span>
          )}
        </fieldset>
        <button className={classes['form-sign-up-button']} type="submit" disabled={!isValid}>
          Create
        </button>
        <span className={classes['form-sign-up-footer']}>
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </form>
    </div>
  )
}
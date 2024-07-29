import { Link } from 'react-router-dom'

import classes from './SignIn.module.scss'

export default function SignIn() {
  return (
    <div className={classes['form-wrap']}>
      <form className={classes['form-sign-in']}>
        <h2 className={classes['form-sign-in-title']}>Sign In</h2>
        <label className={classes['form-sign-in-label']}>
          Email address
          <input placeholder="Email address" className={classes['form-sign-in-input']} type="email" />
        </label>
        <label className={classes['form-sign-in-label']}>
          Password
          <input placeholder="Password" className={classes['form-sign-in-input']} type="password" />
        </label>
        <button className={classes['form-sign-in-button']} type="submit">
          Login
        </button>
        <span className={classes['form-sign-in-span']}>
          Don’t have an account?
          <Link className={classes['form-sign-in-link']} to="/sign-up">
            {' '}
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  )
}
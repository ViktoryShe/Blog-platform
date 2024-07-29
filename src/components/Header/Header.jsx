import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-logo']}>
        <Link to="/">
          <h1 className={styles['header-logo_text']}>Realworld Blog</h1>
        </Link>
      </div>
      <div className={styles['header-btn']}>
        <Link to="/sign-in" className={styles['header-btn_signin']}>Sign In</Link>
        <Link to="/sign-up" className={styles['header-btn_signup']}>Sign Up</Link>
      </div>
    </header>
  )
}

export default Header
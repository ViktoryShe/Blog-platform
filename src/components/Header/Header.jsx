import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import user from '../../assets/user.svg'
import { clearCurrentArticle, clearError, fetchUser, logOut } from '../../store/fetchSlice'

import styles from './Header.module.scss'

function Header() {
  const currentUser = useSelector((state) => state.fetch.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('Current User:', currentUser)
    const token = localStorage.getItem('token')
    if (!currentUser && token) {
      dispatch(fetchUser(token))
    }
  }, [currentUser, dispatch])

  return (
    <header className={styles.header}>
      <Link to="/" className={styles['header-logo']}>
        <h1 className={styles['header-logo_text']}>Realworld Blog</h1>
      </Link>
      {currentUser ? (
        <div className={styles['header-btn']}>
          <Link
            onClick={() => {
              dispatch(clearError('all'))
              dispatch(clearCurrentArticle())
            }}
            to="/new-article"
          >
            <button className={styles['header-btn_create']} type="button">
              Create article
            </button>
          </Link>
          <Link to="/profile">
            <div className={styles['header-user-info']}>
              <h2 className={styles['header-user-info_title']}>{currentUser.username}</h2>
              <img
                src={currentUser.image ? currentUser.image : user}
                alt="UserImg"
                className={styles['header-user-img']}
              />
            </div>
          </Link>
          <Link to="/">
            <button
              onClick={() => dispatch(logOut())}
              className={styles['header-btn_signin']}
              type="button"
            >
              Log Out
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles['header-btn']}>
          <Link to="/sign-in">
            <button className={styles['header-btn_signin']} type="button">
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button className={styles['header-btn_signup']} type="button">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
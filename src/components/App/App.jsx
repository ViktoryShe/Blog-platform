import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Card from '../Card/Card'
import CardList from '../CardList/CardList'
import Header from '../Header/Header'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import EditProfile from '../EditProfile/EditProfile'
import ArticleForm from '../ArticleForm/ArticleForm'
import { HOME, SIGN_IN, SIGN_UP, PROFILE, NEW_ARTICLE, EDIT_ARTICLE, ARTICLE_DETAIL, NOT_FOUND } from '../../routes/routes'

import classes from './App.module.scss'

export default function App() {
  return (
    <Router>
      <div className={classes.app}>
        <Header />
        <main className={classes['app-main']}>
          <Routes>
            <Route path={ARTICLE_DETAIL} element={<Card />} />
            <Route path={SIGN_IN} element={<SignIn />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={PROFILE} element={<EditProfile />} />
            <Route path={NEW_ARTICLE} element={<ArticleForm />} />
            <Route path={EDIT_ARTICLE} element={<ArticleForm />} />
            <Route path={HOME} element={<CardList />} />
            <Route path={NOT_FOUND} element={<Navigate to={HOME} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
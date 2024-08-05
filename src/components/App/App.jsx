import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Card from '../Card/Card'
import CardList from '../CardList/CardList'
import Header from '../Header/Header'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import EditProfile from '../EditProfile/EditProfile'
import ArticleForm from '../ArticleForm/ArticleForm'

import classes from './App.module.scss'

export default function App() {
  return (
    <Router>
      <div className={classes.app}>
        <Header />
        <main className={classes['app-main']}>
          <Routes>
            <Route path="/articles/:slug" element={<Card />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/new-article" element={<ArticleForm />} />
            <Route path="/articles/:slug/edit" element={<ArticleForm />} />
            <Route path="/" element={<CardList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
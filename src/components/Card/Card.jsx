import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import Markdown from 'marked-react'

import CardHeader from '../CardHeader/CardHeader'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCard } from '../../store/fetchSlice'

import styles from './Card.module.scss'

export default function Card() {
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const { currentArticle, loading } = useAppSelector((state) => state.fetch)

  useEffect(() => {
    if (slug) {
      dispatch(fetchCard({ slug }))
    }
  }, [dispatch, slug])

  function renderArticle() {
    if (!currentArticle) {
      return <span>Not article</span>
    }
    return (
      <article className={styles.article}>
        <CardHeader isAlone={false} article={currentArticle} />
        
        <main className={styles.article_content}>
          <Markdown value={currentArticle.body} />
        </main>
      </article>
    )
  }

  return loading ? <Spin /> : <>{renderArticle()}</>
}
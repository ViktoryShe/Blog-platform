import React, { useEffect } from 'react'
import { Spin } from 'antd'
import Markdown from 'marked-react'

import CardHeader from '../CardHeader/CardHeader'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCard } from '../../store/fetchSlice'

import styles from './Card.module.scss'

export default function Card({ articleSlug }) {
  const dispatch = useAppDispatch()
  const { currentArticle, loading, error } = useAppSelector((state) => state.fetch)

  useEffect(() => {
    dispatch(fetchCard({ slug: articleSlug }))
  }, [dispatch, articleSlug])

  function renderArticle() {
    if (loading) return <Spin />
    if (error) return <div>Error loading article.</div>

    if (currentArticle) {
      return (
        <article className={styles.article}>
          <CardHeader article={currentArticle} />
          <main className={styles.article_content}>
            <Markdown value={currentArticle.body} />
          </main>
        </article>
      )
    }
    return null
  }

  return <div className={styles.article}>{renderArticle()}</div>
}
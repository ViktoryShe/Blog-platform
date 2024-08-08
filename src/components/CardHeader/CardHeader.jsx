import React, { useEffect } from 'react'
import uniqid from 'uniqid'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Button, Popconfirm } from 'antd'

import like from '../../assets/like.svg'
import likeFill from '../../assets/likeFill.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectCurrentUser } from '../../store/selectors'
import { fetchDeleteArticle, fetchFavoriteArticle, fetchUnfavoriteArticle } from '../../store/fetchSlice'

import classes from './CardHeader.module.scss'

export default function CardHeader({ article, isAlone = true }) {
  const {
    title, author, createdAt, description, tagList, favorited, favoritesCount,
  } = article
  const currentUser = useAppSelector(selectCurrentUser)
  const isDeleteSuccess = useAppSelector((state) => state.fetchReducer?.isDeleteSuccess)
  const loading = useAppSelector((state) => state.fetchReducer?.loading)
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const formatDate = format(parseISO(createdAt), 'MMMM dd, yyyy', { locale: enGB })
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isDeleteSuccess) {
      navigate('/')
    }
  }, [isDeleteSuccess, loading, navigate])

  const headerClass = classNames({
    [classes['app-card']]: true,
    [classes['app-card--alone']]: isAlone,
  })

  const handleLike = () => {
    if (token) {
      if (!favorited) {
        dispatch(fetchFavoriteArticle({ token, slug: article.slug }))
      } else {
        dispatch(fetchUnfavoriteArticle({ token, slug: article.slug }))
      }
    }
  }

  const handleDelete = () => {
    if (token) {
      dispatch(fetchDeleteArticle({ token, slug: article.slug }))
    }
  }

  return (
    <header className={headerClass}>
      <div className={classes['card-info']}>
        <div className={classes['card-info-wrap']}>
          <div className={classes['card-info-top']}>
            <Link to={`/articles/${article.slug}`} className={classes['card-title_link']}>
              <h2>{title}</h2>
            </Link>
            <button type="button" className={classes.like} onClick={handleLike}>
              {favorited ? <img src={likeFill} alt="LikeFill" /> : <img src={like} alt="Like" />}
              <span>{favoritesCount}</span>
            </button>
          </div>
          <div className={classes.user}>
            <div className={classes['user-info']}>
              <span className={classes['user-info_title']}>{author.username}</span>
              <span className={classes['user-info_date']}>{formatDate}</span>
            </div>
            <img src={author.image} alt="UserImg" className={classes['user-img']} />
          </div>
        </div>
        <ul className={classes['card-tag-list']}>
          {tagList.length > 0 ? (
            tagList
              .filter((tag) => tag?.match(/\S/))
              .map((tag) => (
                <li key={uniqid.time('tag:')} className={classes['card-tag-item']}>
                  {tag}
                </li>
              ))
          ) : (
            <div className={classes['card-tag-not']}>No tags..</div>
          )}
        </ul>
      </div>
      <div className={classes['card-article']}>
        <p className={classes['card-article-description']}>{description}</p>
      </div>
      {token && currentUser && currentUser.username === author.username && !isAlone && (
        <div className={classes['card-article-change']}>
          <Popconfirm
            title="Are you sure to delete this article?"
            okText="Yes"
            cancelText="No"
            placement="right"
            onConfirm={handleDelete}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={`/articles/${article.slug}/edit`}>
            <button type="button" className={classes['card-article-change--edit']}>
              Edit
            </button>
          </Link>
        </div>
      )}
    </header>
  )
}
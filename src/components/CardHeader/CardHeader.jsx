import React from 'react'
import uniqid from 'uniqid'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import like from '../../assets/like.svg'
import likeFill from '../../assets/likeFill.svg'

import classes from './CardHeader.module.scss'

export default function CardHeader({ article, isAlone = true }) {
  const { title, author, createdAt, description, tagList, favorited, favoritesCount } = article

  const headerClass = classNames({
    [classes['app-card']]: true,
    [classes['app-card--alone']]: isAlone,
  })

  const formattedDate = format(parseISO(createdAt), 'MMMM dd, yyyy', { locale: enGB })

  const tagsItem = tagList.map((tag) => (
    <li key={uniqid.time('tag:')} className={classes['card-tag-item']}>
      {tag}
    </li>
  ))

  return (
    <header className={headerClass}>
      <div className={classes['card-info']}>
        <div className={classes['card-info-wrap']}>
          <div className={classes['card-info-top']}>
            <Link to={`/articles/${article.slug}`} className={classes['card-title_link']}>
              <h2>{title}</h2>
            </Link>
            <button type="button" className={classes.like}>
              <img src={favorited ? likeFill : like} alt="Like" />
              <span>{favoritesCount}</span>
            </button>
          </div>
          <div className={classes.user}>
            <div className={classes['user-info']}>
              <span className={classes['user-info_title']}>{author.username}</span>
              <span className={classes['user-info_date']}>{formattedDate}</span>
            </div>
            <img src={author.image} alt="UserImg" className={classes['user-img']} />
          </div>
        </div>
        <ul className={classes['card-tag-list']}>
          {tagList.length > 0 ? tagsItem : <div className={classes['card-tag-not']}>Not tags..</div>}
        </ul>
      </div>
      <div className={classes['card-article']}>
        <p className={classes['card-article-description']}>{description}</p>
      </div>
    </header>
  )
}
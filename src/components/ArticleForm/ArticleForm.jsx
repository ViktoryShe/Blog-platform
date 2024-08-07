import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCreateArticle, fetchEditArticle, fetchCard, clearCurrentArticle, clearError } from '../../store/fetchSlice'
import { selectCurrentUser, selectLoading, selectError, selectCurrentArticle } from '../../store/selectors'

import classes from './ArticleForm.module.scss'

export default function ArticleForm({ articleSlug = null }) {
  const token = localStorage.getItem('token')
  const currentUser = useAppSelector(selectCurrentUser)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const currentArticle = useAppSelector(selectCurrentArticle)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    control,
    register,
    formState: { errors, submitCount, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      text: '',
      tags: [{ name: '' }],
    },
  })

  const { append, fields, remove } = useFieldArray({ name: 'tags', control })

  useEffect(() => {
    if (articleSlug) {
      dispatch(fetchCard({ slug: articleSlug, token: null }))
    } else {
      dispatch(clearCurrentArticle())
      reset({
        title: '',
        description: '',
        text: '',
        tags: [{ name: '' }],
      })
    }
  }, [dispatch, articleSlug, reset, token])

  useEffect(() => {
    if (currentArticle) {
      reset({
        title: currentArticle.title || '',
        description: currentArticle.description || '',
        text: currentArticle.body || '',
        tags: currentArticle.tagList?.map(tag => ({ name: tag })) || [{ name: '' }],
      })
    }
  }, [currentArticle, reset])

  useEffect(() => {
    if (submitCount && !error && !loading && !isSubmitting && !Object.keys(errors).length) {
      navigate(`/articles/${currentArticle?.slug}`)
    }
  }, [isSubmitting, loading, submitCount, error, navigate, currentArticle?.slug, errors])

  const onSubmit = (data) => {
    if (token) {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tags.map(tag => tag.name),
      }
      if (articleSlug) {
        dispatch(fetchEditArticle({ body: { article: articleData }, token, slug: articleSlug }))
      } else {
        dispatch(fetchCreateArticle({ body: { article: articleData }, token }))
      }
    }
  }

  if (!token || (currentArticle && currentUser && currentArticle.author.username !== currentUser.username)) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className={classes['form-wrap']}>
      <form className={classes['form-article']} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes['form-article-title']}>
          {articleSlug && currentArticle ? 'Edit article' : 'Create new article'}
        </h2>

        <label className={classes['form-article-label']}>
          Title
          <input
            {...register('title', { required: 'Поле обязательно к заполнению' })}
            placeholder="Title"
            className={classes['form-article-input']}
            type="text"
          />
        </label>
        {errors.title && <span className={classes['form-article-error']}>{errors.title.message}</span>}

        <label className={classes['form-article-label']}>
          Short description
          <input
            {...register('description', { required: 'Поле обязательно к заполнению' })}
            placeholder="Short description"
            className={classes['form-article-input']}
            type="text"
          />
        </label>
        {errors.description && <span className={classes['form-article-error']}>{errors.description.message}</span>}

        <label className={classes['form-article-label']}>
          Text
          <textarea
            {...register('text', { required: 'Поле обязательно к заполнению' })}
            placeholder="Text"
            className={classes['form-article-input--textarea']}
          />
        </label>
        {errors.text && <span className={classes['form-article-error']}>{errors.text.message}</span>}

        <section className={classes['form-article-section']}>
          <ul className={classes['form-article-section-list']}>
            Tags
            {fields.map((field, index) => (
              <li key={field.id} className={classes['form-article-section-list-item']}>
                <input
                  {...register(`tags.${index}.name`, {
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'You can use only English letters and digits without spaces and other symbols',
                    },
                  })}
                  placeholder="Tag"
                  className={`${classes['form-article-input']} ${classes['form-article-input--tag']}`}
                  type="text"
                />
                <button
                  onClick={() => remove(index)}
                  className={classes['form-article-button--delete']}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => append({ name: '' })}
            className={classes['form-article-button--add']}
            type="button"
          >
            Add tag
          </button>
        </section>

        <button 
          onClick={() => dispatch(clearError('all'))}
          className={classes['form-article-button']} 
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}
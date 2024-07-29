import { useEffect } from 'react'
import { ConfigProvider, Pagination, Spin } from 'antd'
import uniqid from 'uniqid'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCards } from '../../store/fetchSlice'
import CardHeader from '../CardHeader/CardHeader'

import classes from './CardList.module.scss'

export default function CardList() {
  const dispatch = useAppDispatch()

  const { articles, articlesCount, loading } = useAppSelector((state) => state.fetch)

  useEffect(() => {
    dispatch(fetchCards({ offset: 0 }))
  }, [dispatch])

  const cardsItem = articles.map((article) => (
    <li key={uniqid.time('cards:')}>
      <CardHeader isAlone article={article} />
    </li>
  ))

  return (
    <>
      {loading ? <Spin /> : <ul className={classes.cardlist}>{cardsItem}</ul>}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffffff',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890ff',
            },
          },
        }}
      >
        <Pagination
          className={classes.pagination}
          showSizeChanger={false}
          defaultCurrent={1}
          total={articlesCount}
          onChange={(value) => {
            dispatch(fetchCards({ offset: 5 * (value - 1) }))
          }}
        />
      </ConfigProvider>
    </>
  )
}
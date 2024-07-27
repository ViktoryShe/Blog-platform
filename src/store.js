import { configureStore } from '@reduxjs/toolkit'

import fetchReducer from './store/fetchSlice'

const store = configureStore({
  reducer: {
    fetch: fetchReducer,
  },
})

export default store
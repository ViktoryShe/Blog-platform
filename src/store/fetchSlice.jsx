import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const baseUrl = 'https://blog.kata.academy/api'

const initialState = {
  loading: false,
  error: null,
  articles: [],
  articlesCount: 0,
  currentArticle: null,
}

export const fetchCards = createAsyncThunk(
  'fetch/fetchCards',
  async ({ offset }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles?limit=5&offset=${offset}`)
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`)
    }
  }
)

export const fetchCard = createAsyncThunk(
  'fetch/fetchCard',
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch slug: ${response.status}`)
      }
      const data = await response.json()
      return data.article
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`)
    }
  }
)

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.loading = false
        state.error = null
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : 'Unknown error'
      })
      .addCase(fetchCard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.loading = false
        state.currentArticle = action.payload
      })
      .addCase(fetchCard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : 'Unknown error'
      })
  },
})

export default fetchSlice.reducer
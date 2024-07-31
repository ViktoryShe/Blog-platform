import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const baseUrl = 'https://blog.kata.academy/api'

const initialState = {
  loading: false,
  error: '',
  articles: [],
  articlesCount: 0,
  currentArticle: null,
  currentUser: null,
  isDeleteSuccess: false,
}

export const fetchCards = createAsyncThunk(
  'fetch/fetchCards',
  async ({ offset, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles?limit=5&offset=${offset}`, {
        method: 'GET',
        headers: token ? { Authorization: `Token ${token}` } : {},
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(`Server Error ${response.status} ${data.errors.message}`)
      }
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCard = createAsyncThunk(
  'fetch/fetchCard',
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}`, {
        method: 'GET',
        headers: token ? { Authorization: `Token ${token}` } : {},
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(`Server Error ${response.status} ${data.errors.message}`)
      }
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCreateUser = createAsyncThunk(
  'fetch/fetchCreateUser',
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Error, email or password is invalid')
      }
      return data.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUser = createAsyncThunk(
  'fetch/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`)
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserLogin = createAsyncThunk(
  'fetch/fetchUserLogin',
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Error, email or password is invalid')
      }
      return data.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserEdit = createAsyncThunk(
  'fetch/fetchUserEdit',
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors || 'Error, email or password is invalid')
      }
      return data.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCreateArticle = createAsyncThunk(
  'fetch/fetchCreateArticle',
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors.message)
      }
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchDeleteArticle = createAsyncThunk(
  'fetch/fetchDeleteArticle',
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` },
      })

      if (!response.ok) {
        const data = await response.json()
        return rejectWithValue(data.errors.message)
      }
      return ''
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchEditArticle = createAsyncThunk(
  'fetch/fetchEditArticle',
  async ({ body, slug, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors.message)
      }
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchFavoriteArticle = createAsyncThunk(
  'fetch/fetchFavoriteArticle',
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}` },
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors.message)
      }
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUnfavoriteArticle = createAsyncThunk(
  'fetch/fetchUnfavoriteArticle',
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` },
      })

      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.errors.message)
      }
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

function isError(action) {
  return action.type.endsWith('rejected')
}

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token')
      state.currentUser = null
    },
    clearError: (state, action) => {
      if (action.payload === 'all') {
        state.error = ''
      } else if (typeof state.error === 'object') {
        delete state.error[action.payload]
      }
      if (typeof state.error === 'object' && Object.keys(state.error).length === 0) {
        state.error = ''
      }
    },
    clearDeleteState: (state) => {
      state.isDeleteSuccess = false
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCard.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.loading = false
        state.currentArticle = action.payload
      })
      .addCase(fetchCards.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.loading = false
        state.error = ''
      })
      .addCase(fetchCreateUser.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        localStorage.setItem('token', action.payload.token)
        state.loading = false
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload
        localStorage.setItem('token', action.payload.token)
        state.loading = false
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        localStorage.setItem('token', action.payload.token)
        state.loading = false
      })
      .addCase(fetchUserEdit.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchUserEdit.fulfilled, (state, action) => {
        state.currentUser = action.payload
        localStorage.setItem('token', action.payload.token)
        state.loading = false
      })
      .addCase(fetchCreateArticle.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchCreateArticle.fulfilled, (state, action) => {
        state.currentArticle = action.payload
        state.loading = false
      })
      .addCase(fetchEditArticle.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchEditArticle.fulfilled, (state, action) => {
        state.currentArticle = action.payload
        state.loading = false
      })
      .addCase(fetchDeleteArticle.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.loading = false
        state.isDeleteSuccess = true
      })
      .addCase(fetchFavoriteArticle.pending, (state) => {
        state.error = ''
      })
      .addCase(fetchFavoriteArticle.fulfilled, (state, action) => {
        state.articles[
          state.articles?.findIndex((article) => article.slug === action.payload.slug)
        ] = action.payload
        state.currentArticle = action.payload
      })
      .addCase(fetchUnfavoriteArticle.pending, (state) => {
        state.error = ''
      })
      .addCase(fetchUnfavoriteArticle.fulfilled, (state, action) => {
        state.articles[
          state.articles?.findIndex((article) => article.slug === action.payload.slug)
        ] = action.payload
        state.currentArticle = action.payload
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const { logOut, clearError, clearDeleteState, clearCurrentArticle } = fetchSlice.actions
export default fetchSlice.reducer
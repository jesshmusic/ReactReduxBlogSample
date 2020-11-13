import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
  pagy: {}
}

export const fetchArticles = createAsyncThunk('articles/fetchPosts', async () => {
  const response = await axios.get('https://dialog-blog.herokuapp.com/articles')
  return response.data
})

const articleSlice = createSlice({
  name: 'articles',
  initialState: initialState,
  reducers: {
    articlesLoading: state => {
      if (state.status === 'idle') {
        state.status = 'pending'
      }
    },
    articlesReceived: (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle'
        state.articles = action.payload
      }
    }
  },
  extraReducers: {
    [fetchArticles.pending]: state => {
      state.status = 'loading'
    },
    [fetchArticles.fulfilled]: (state, action) => {
      return {
        articles: action.payload.data,
        status: 'succeeded',
        pagy: action.payload.pagy
      }
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default articleSlice.reducer

export const selectAllArticles = state => state.articles.articles
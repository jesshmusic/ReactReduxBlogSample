import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { createArticle, updateArticle } from './singleArticleSlice'

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

export const searchArticles = createAsyncThunk('articles/searchPosts', async (searchValue) => {
  const response = await axios.get(`https://dialog-blog.herokuapp.com/articles?search=${searchValue}`)
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
    },
    [searchArticles.pending]: state => {
      state.status = 'loading'
    },
    [searchArticles.fulfilled]: (state, action) => {
      return {
        articles: action.payload.data,
        status: 'succeeded',
        pagy: action.payload.pagy
      }
    },
    [searchArticles.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateArticle.fulfilled]: (state, action) => {
      return {
        articles: state.articles.map(article => (article.id === action.payload.id ? action.payload : article))
      }
    },
    [createArticle.fulfilled]: (state, action) => {
      return {
        articles: [action.payload, ...state.articles]
      }
    }
  }
})

export default articleSlice.reducer

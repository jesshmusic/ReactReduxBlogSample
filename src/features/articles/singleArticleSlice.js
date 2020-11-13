import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  article: {},
  status: 'idle',
  error: null,
  comments: []
}

export const fetchArticle = createAsyncThunk('article/fetchSingleArticle', async (articleID) => {
  const response = await axios.get(`https://dialog-blog.herokuapp.com/articles/${articleID}`)
  return response.data
})

const articleSlice = createSlice({
  name: 'article',
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
        state.article = action.payload
      }
    }
  },
  extraReducers: {
    [fetchArticle.pending]: state => {
      state.status = 'loading'
    },
    [fetchArticle.fulfilled]: (state, action) => {
      return {
        article: action.payload.data,
        status: 'succeeded',
        pagy: action.payload.pagy
      }
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default articleSlice.reducer

export const selectSingleArticle = state => state.article.article

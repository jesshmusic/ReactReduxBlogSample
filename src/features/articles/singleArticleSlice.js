import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  article: {},
  status: 'idle',
  error: null,
  comments: []
}

export const fetchArticle = createAsyncThunk('article/handleFetchSingleArticle', async (articleID) => {
  const article = await axios.get(`https://dialog-blog.herokuapp.com/articles/${articleID}`)
  const comments = await axios.get(`https://dialog-blog.herokuapp.com/comments?article_id=${articleID}`)

  return {
    ...article.data.data,
    comments: comments.data.data
  }
})

export const updateArticle = createAsyncThunk('article/handleUpdateSingleArticle', async (articleData) => {
  const article = await axios.put('https://dialog-blog.herokuapp.com/articles/', {
    id: articleData.id,
    title: articleData.title,
    body: articleData.body
  })
  const comments = await axios.get(`https://dialog-blog.herokuapp.com/comments?article_id=${article.id}`)
  return {
    ...article.data.data,
    comments: comments.data.data
  }
})

export const createArticle = createAsyncThunk('article/handleCreateSingleArticle', async (articleData) => {
  const article = await axios.post('https://dialog-blog.herokuapp.com/articles/', {
    title: articleData.title,
    body: articleData.body
  })
  const comments = await axios.get(`https://dialog-blog.herokuapp.com/comments?article_id=${article.id}`)
  return {
    ...article.data.data,
    comments: comments.data.data
  }
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
        article: action.payload,
        status: 'succeeded'
      }
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateArticle.pending]: state => {
      state.status = 'loading'
    },
    [updateArticle.fulfilled]: (state, action) => {
      return {
        article: action.payload,
        status: 'succeeded'
      }
    },
    [updateArticle.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [createArticle.pending]: state => {
      state.status = 'loading'
    },
    [createArticle.fulfilled]: (state, action) => {
      return {
        article: action.payload,
        status: 'succeeded'
      }
    },
    [createArticle.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default articleSlice.reducer

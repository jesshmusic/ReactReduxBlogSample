import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  comments: [],
  status: 'idle',
  error: null
}

export const fetchComments = createAsyncThunk('comments/handleFetchSingleComment', async (articleID) => {
  const comments = await axios.get(`https://dialog-blog.herokuapp.com/comments?article_id=${articleID}`)

  return comments.data.data
})

export const updateComment = createAsyncThunk('comment/handleUpdateSingleComment', async (articleID, commentData) => {
  const comments = await axios.put(`https://dialog-blog.herokuapp.com/comments/${commentData.id}`, {
    comment: {
      article_id: articleID,
      title: commentData.title,
      body: commentData.body
    }
  })
  return comments.data.data
})

export const createComment = createAsyncThunk('article/handleCreateSingleComment', async (articleID, commentData) => {
  const comments = await axios.post('https://dialog-blog.herokuapp.com/comments', {
    comment: {
      article_id: articleID,
      title: commentData.title,
      body: commentData.body
    }
  })
  return comments.data.data
})

const commentsSlice = createSlice({
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
    [fetchComments.pending]: state => {
      state.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
      return {
        comments: action.payload,
        status: 'succeeded'
      }
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateComment.pending]: state => {
      state.status = 'loading'
    },
    [updateComment.fulfilled]: (state, action) => {
      return {
        comments: state.comments.map(comment => (comment.id === action.payload.id ? action.payload : comment)),
        status: 'succeeded'
      }
    },
    [updateComment.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [createComment.pending]: state => {
      state.status = 'loading'
    },
    [createComment.fulfilled]: (state, action) => {
      return {
        comments: [action.payload, ...state.comments],
        status: 'succeeded'
      }
    },
    [createComment.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default commentsSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  articles: [],
  status: 'idle',
  error: null
}

export const fetchArticles = createAsyncThunk('articles/fetchPosts', async () => {
  const response = await axios.get('https://dialog-blog.herokuapp.com/articles')
  return response.posts
})

export const articleSlice = createSlice({
  name: 'articles',
  initialState: initialState,
  reducers: {
    getArticles: state => {

    }
  }
})

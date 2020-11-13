import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../features/articles/articlesSlice'
import articleReducer from '../features/articles/singleArticleSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer
  }
})

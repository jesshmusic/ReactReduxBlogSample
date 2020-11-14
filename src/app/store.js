import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../features/articles/articlesSlice'
import articleReducer from '../features/articles/singleArticleSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    comments: commentsReducer
  }
})

import React from 'react'
import styles from './App.module.css'
import { connect } from 'react-redux'
import { createArticle, deleteArticle, fetchArticle, updateArticle } from './features/articles/singleArticleSlice'
import PropTypes from 'prop-types'
import Sidebar from './components/Sidebar'
import ArticleDisplay from './components/ArticleDisplay'

class App extends React.Component {
  componentDidMount () {
    this.fetchSingleArticle(1)
  }

  handleFetchSingleArticle (event, articleID) {
    event.preventDefault()
    this.fetchSingleArticle(articleID)
  }

  cancelError (articleID) {
    this.props.dispatch(fetchArticle(articleID))
  }

  fetchSingleArticle (articleID) {
    this.props.dispatch(fetchArticle(articleID))
  }

  createPost (articleData) {
    this.props.dispatch(createArticle(articleData))
  }

  updatePost (articleData) {
    this.props.dispatch(updateArticle(articleData))
  }

  deletePost (articleID) {
    this.props.dispatch(deleteArticle(articleID))
  }

  render () {
    const { article, articles } = this.props
    return (
      <div className={ styles.container }>
        <header className={ styles.header }>
          <h1>Sample Blog Home</h1>
        </header>
        <section className={ styles.content }>
          <Sidebar onFetchSingleArticle={this.handleFetchSingleArticle.bind(this)}
                   articles={articles}/>
          <ArticleDisplay article={article}
                          onCancelError={this.cancelError.bind(this)}
                          onDeleteSingleArticle={this.deletePost.bind(this)}
                          onUpdateSingleArticle={this.updatePost.bind(this)}
                          onCreateSingleArticle={this.createPost.bind(this)}/>
        </section>
      </div>
    )
  }
}
App.propTypes = {
  article: PropTypes.object,
  articles: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
  articles: state.articles,
  article: state.article
})

export default connect(mapStateToProps)(App)

import React from 'react'
import styles from './App.module.css'
import { connect } from 'react-redux'
import { fetchArticles, searchArticles } from './features/articles/articlesSlice'
import { fetchArticle } from './features/articles/singleArticleSlice'
import { PropTypes } from 'prop-types'
import Sidebar from './components/Sidebar'

const ENTER_KEY = 13

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchArticles())
    this.fetchSingleArticle(1)
  }

  handleFetchSingleArticle (event, articleID) {
    event.preventDefault()
    this.fetchSingleArticle(articleID)
  }

  fetchSingleArticle (articleID) {
    this.props.dispatch(fetchArticle(articleID))
  }

  handleSearchChange (event) {
    this.setState({ searchValue: event.target.value })
  }

  handleSearchKeyDown (event) {
    if (event.keyCode !== ENTER_KEY) {
      return
    }
    event.preventDefault()
    this.props.dispatch(searchArticles(this.state.searchValue))
  }

  handleSearchButton (event) {
    event.preventDefault()
    this.props.dispatch(searchArticles(this.state.searchValue))
  }

  render () {
    const { article, articles } = this.props
    return (
      <div className={ styles.container }>
        <header className={ styles.header }>
          <h1>Sample Blog Home</h1>
        </header>
        <section className={ styles.content }>
          <Sidebar onSearch={this.handleSearchKeyDown.bind(this)}
                   onSearchButton={this.handleSearchButton.bind(this)}
                   onSearchChange={this.handleSearchChange.bind(this)}
                   onFetchSingleArticle={this.handleFetchSingleArticle.bind(this)}
                   searchValue={this.state.searchValue}
                   articles={articles}/>
          <div className={ styles.articleDisplay }>
            { article.status !== 'succeeded' ? (
              <i className={ `${styles.loadingIcon} fas fa-spinner fa-spin` }/>
            ) : (
              <article className={styles.article}>
                <h2>{ article.article.title }</h2>
                <div>
                  { article.article.body }
                </div>
                {article.article.comments ? (
                  <div>
                    <h3>Comments</h3>
                    {article.article.comments.map(articleComment => (
                      <div key={`articleComment${articleComment.id}`}>{articleComment.body}</div>
                    ))}
                  </div>
                ) : null}
              </article>
            ) }
          </div>
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

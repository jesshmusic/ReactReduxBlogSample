import React from 'react'
import styles from './App.module.css'
import { connect } from 'react-redux'
import { fetchArticles } from './features/articles/articlesSlice'
import ArticleTease from './features/articles/ArticleTease'
import { fetchArticle } from './features/articles/singleArticleSlice'
import { PropTypes } from 'prop-types'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.fetchSingleArticle = this.fetchSingleArticle.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchArticles())
    this.props.dispatch(fetchArticle(1))
  }

  fetchSingleArticle (event, articleID) {
    event.preventDefault()
    console.log(this)
    this.props.dispatch(fetchArticle(articleID))
  }

  render () {
    const { article, articles } = this.props
    return (
      <div className={ styles.container }>
        <header className={ styles.header }>
          <h1>Sample Blog Home</h1>
        </header>
        <section className={ styles.content }>
          <div className={ styles.sidebar }>
            { articles.status === 'succeeded' ? (articles.articles.map(article => (
              <ArticleTease article={ article } key={ article.id } getArticle={this.fetchSingleArticle}/>
            ))) : (
              <i className="fas fa-spinner fa-spin"/>
            )
            }
          </div>
          <div className={ styles.articleDisplay }>
            { article.status !== 'succeeded' ? (
              <i className={ `${styles.loadingIcon} fas fa-spinner fa-spin` }/>
            ) : (
              <article className={styles.article}>
                <h2>{ article.article.title }</h2>
                <div>
                  { article.article.body }
                </div>
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

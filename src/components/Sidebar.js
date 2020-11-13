import styles from '../App.module.css'
import ArticleTease from '../features/articles/ArticleTease'
import React from 'react'
import PropTypes from 'prop-types'
import { fetchArticles, searchArticles } from '../features/articles/articlesSlice'
import { connect } from 'react-redux'

const ENTER_KEY = 13

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchArticles())
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
    const { onFetchSingleArticle, articles } = this.props
    return (
      <div className={ styles.sidebar }>
        <div className={styles.searchSection}>
          <input className={styles.searchInput}
                 placeholder="Search..."
                 value={this.state.searchValue}
                 onKeyDown={this.handleSearchKeyDown.bind(this)}
                 onChange={this.handleSearchChange.bind(this)}
                 autoFocus={true}
          />
          <button className={styles.searchButton}
                  onClick={this.handleSearchButton.bind(this)}
                  title={'Search'}>
            <i className="fas fa-search"/>
          </button>
        </div>
        <div className={styles.articleCount}>
          {articles.articles.length} articles out of {articles.pagy.count}
        </div>
        { articles.status === 'succeeded' ? (
          articles.articles.map(article => (
            <ArticleTease article={ article } key={ article.id } getArticle={onFetchSingleArticle}/>
          ))) : (
          <i className="fas fa-spinner fa-spin"/>
        )
        }
      </div>
    )
  }
}

Sidebar.propTypes = {
  onFetchSingleArticle: PropTypes.func.isRequired,
  articles: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
  articles: state.articles
})

export default connect(mapStateToProps)(Sidebar)

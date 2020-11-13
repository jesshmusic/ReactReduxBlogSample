import styles from '../App.module.css'
import ArticleTease from '../features/articles/ArticleTease'
import React from 'react'
import { PropTypes } from 'prop-types'

const Sidebar = ({ searchValue, onSearch, onSearchChange, onSearchButton, onFetchSingleArticle, articles }) => {
  return (
    <div className={ styles.sidebar }>
      <div className={styles.searchSection}>
        <input className={styles.searchInput}
               placeholder="Search..."
               value={searchValue}
               onKeyDown={onSearch}
               onChange={onSearchChange}
               autoFocus={true}
        />
        <button className={styles.searchButton}
                onClick={onSearchButton}
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

Sidebar.propTypes = {
  searchValue: PropTypes.string,
  onFetchSingleArticle: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchButton: PropTypes.func.isRequired,
  articles: PropTypes.array
}

export default Sidebar

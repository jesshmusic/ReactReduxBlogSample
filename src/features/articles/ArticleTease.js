import React from 'react'
import styles from './ArticleTease.module.css'
import PropTypes from 'prop-types'

const ArticleTease = ({ article, getArticle }) => {
  return (
    <button className={`${styles.container} ArticleTease`}
            onClick={event => getArticle(event, article.id)}>
      <h2 className={styles.heading}>{article.title}</h2>
    </button>
  )
}
ArticleTease.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }),
  getArticle: PropTypes.func.isRequired
}

export default ArticleTease

import styles from '../App.module.css'
import PropTypes from 'prop-types'
import React from 'react'

class ArticleDisplay extends React.Component {
  render () {
    return (
      <div className={ styles.articleDisplay }>
      { this.props.article.status !== 'succeeded' ? (
        <i className={ `${styles.loadingIcon} fas fa-spinner fa-spin` }/>
      ) : (
        <article className={ styles.article }>
          <h2>{ this.props.article.article.title }</h2>
          <div>
            { this.props.article.article.body }
          </div>
          { this.props.article.article.comments ? (
            <div>
              <h3>Comments</h3>
              { this.props.article.article.comments.map(articleComment => (
                <div key={ `articleComment${articleComment.id}` }>{ articleComment.body }</div>
              )) }
            </div>
          ) : null }
        </article>
      ) }
    </div>
    )
  }
}

ArticleDisplay.propTypes = {
  article: PropTypes.any
}

export default ArticleDisplay

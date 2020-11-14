import styles from './ArticleDisplay.module.css'
import PropTypes from 'prop-types'
import React from 'react'
import ArticleForm from './ArticleForm'

class ArticleDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'read',
      article: props.article.article
    }
  }

  toggleCreateState () {
    this.setState({
      status: this.state.status !== 'new' ? 'new' : 'read',
      article: {}
    })
  }

  toggleEditState () {
    this.setState({
      status: this.state.status !== 'edit' ? 'edit' : 'read',
      article: this.props.article.article
    })
  }

  createPost (event, articleData) {
    event.preventDefault()
    this.props.onCreateSingleArticle(articleData)
    this.setState({ isCreating: false })
  }

  updatePost (event, articleData) {
    event.preventDefault()
    this.props.onUpdateSingleArticle(articleData)
    this.setState({ isEditing: false })
  }

  render () {
    switch (this.state.status) {
    case 'read':
      return (
          <div className={ styles.articleDisplay }>
            { this.props.article.status !== 'succeeded' ? (
              <i className={ `${styles.loadingIcon} fas fa-spinner fa-spin` }/>
            ) : (
              <article className={ styles.article }>
                <div className={ 'pt-3 pb-5 btn-toolbar' }>
                  <button className={ 'btn btn-info' }
                          onClick={ this.toggleEditState.bind(this) }>Edit
                  </button>
                  <div className={'btn-group ml-auto mr-0'}>
                    <button className={ 'btn btn-success' }
                            onClick={ this.toggleCreateState.bind(this) }>NEW
                    </button>
                    <button className={ 'btn btn-danger' }>Delete</button>
                  </div>
                </div>
                <h2>{ this.props.article.article.title }</h2>
                <div className={'mb-5'}>
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
    case 'edit':
      return (
          <div className={ styles.articleDisplay }>
            <div className={ styles.article }>
              <ArticleForm formID={'ArticleEditForm'}
                           onCancel={ this.toggleEditState.bind(this) }
                           onSubmit={ this.updatePost.bind(this) }
                           article={ this.props.article.article }/>
            </div>
          </div>
      )
    default:
      return (
          <div className={ styles.articleDisplay }>
            <div className={ styles.article }>
              <ArticleForm formID={'ArticleCreateForm'}
                           onCancel={ this.toggleCreateState.bind(this) }
                           onSubmit={ this.createPost.bind(this) }/>
            </div>
          </div>
      )
    }
  }
}

ArticleDisplay.propTypes = {
  article: PropTypes.any,
  defaultArticleID: PropTypes.number,
  onCreateSingleArticle: PropTypes.func.isRequired,
  onUpdateSingleArticle: PropTypes.func.isRequired
}

export default ArticleDisplay

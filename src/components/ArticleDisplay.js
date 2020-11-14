import styles from './ArticleDisplay.module.css'
import PropTypes from 'prop-types'
import React from 'react'
import ArticleForm from './ArticleForm'
import Error from './Error'
import CommentsList from './CommentsList'

class ArticleDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      articleState: 'read',
      article: props.article.article
    }
  }

  handleCancelError () {
    this.props.onCancelError(this.props.article.article.id)
    this.setState({
      articleState: 'read',
      article: this.props.article.article
    })
  }

  toggleCreateState () {
    this.setState({
      articleState: this.state.status !== 'new' ? 'new' : 'read',
      article: {}
    })
  }

  toggleEditState () {
    this.setState({
      articleState: this.state.status !== 'edit' ? 'edit' : 'read',
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

  getArticleDisplay () {
    switch (this.props.article.status) {
    case 'succeeded':
      return this.getContentState()
    case 'failed':
      return <Error error={this.props.article.error} onCancel={this.handleCancelError.bind(this)}/>
    default:
      return <i className={ `${styles.loadingIcon} fas fa-spinner fa-spin` }/>
    }
  }

  getContentState () {
    switch (this.state.articleState) {
    case 'read':
      return (
          <div className={ styles.articleDisplay }>
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
              <CommentsList articleID={this.props.article.article.id} />
            </article>
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

  render () {
    return this.getArticleDisplay()
  }
}

ArticleDisplay.propTypes = {
  article: PropTypes.any,
  defaultArticleID: PropTypes.number,
  onCancelError: PropTypes.func.isRequired,
  onCreateSingleArticle: PropTypes.func.isRequired,
  onUpdateSingleArticle: PropTypes.func.isRequired
}

export default ArticleDisplay

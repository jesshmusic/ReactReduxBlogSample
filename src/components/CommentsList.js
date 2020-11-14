import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import { connect } from 'react-redux'
import { fetchComments, createComment, updateComment } from '../features/comments/commentsSlice'

class CommentsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showNewCommentForm: false,
      newCommentData: {}
    }
  }

  componentDidMount () {
    this.fetchComments()
  }

  fetchComments () {
    this.props.dispatch(fetchComments(this.props.articleID))
  }

  addComment () {
    this.setState({
      showNewCommentForm: true
    })
  }

  createComment (event) {
    event.preventDefault()
    this.props.dispatch(createComment(this.props.articleID, this.state.newCommentData))
  }

  cancelAddComment () {
    this.setState({
      showNewCommentForm: false
    })
  }

  editComment (commentData) {
    this.props.dispatch(updateComment(this.props.articleID, commentData))
  }

  handleNewCommentChange (event) {
    event.preventDefault()
    this.setState({
      newCommentData: {
        ...this.state.newCommentData,
        body: event.target.value
      }
    })
  }

  render () {
    return (
      <div>
        <h3 className={'mb-4 w-100 d-flex'}>
          Comments
          { !this.state.showNewCommentForm ? (
            <button className={'btn btn-success ml-auto mr-0'} onClick={this.addComment.bind(this)}>New Comment</button>
          ) : (
            <button className={'btn btn-warning ml-auto mr-0'} onClick={this.cancelAddComment.bind(this)}>Cancel</button>
          ) }
        </h3>
        { this.state.showNewCommentForm ? (
          <form className={'form-inline'} onSubmit={this.createComment.bind(this)}>
            <label className={'sr-only'} htmlFor="commentBody">Comment Text</label>
            <textarea className="form-control mb-2 mr-sm-2"
                      id="commentBody"
                      onChange={this.handleNewCommentChange.bind(this)}
                      value={this.state.newCommentData.body}
                      placeholder="Comment" />
            <button type="submit" className="btn btn-primary mb-2" onClick={this.createComment.bind(this)}>Submit</button>
          </form>
        ) : null}
        { this.props.comments ? (
        <div className={'list-group'}>
          { this.props.comments.comments.map(articleComment => (
            <Comment key={ `articleComment${articleComment.id}` }
                     comment={ articleComment }
                     onEditComment={ this.editComment.bind(this) }/>
          )) }
        </div>
        ) : (
          <i className={ 'fas fa-spinner fa-spin' }/>
        )}
      </div>
    )
  }
}

CommentsList.propTypes = {
  articleID: PropTypes.number.isRequired,
  comments: PropTypes.any,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  comments: state.comments
})

export default connect(mapStateToProps)(CommentsList)

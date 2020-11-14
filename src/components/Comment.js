import React from 'react'
import PropTypes from 'prop-types'

class Comment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showCommentForm: false,
      commentData: props.comment
    }
  }

  editComment (event) {
    event.preventDefault()
    this.props.onEditComment(this.state.commentData)
  }

  handleCommentChange (event) {
    event.preventDefault()
    this.setState({
      commentData: {
        ...this.state.commentData,
        body: event.target.value
      }
    })
  }

  toggleCommentForm () {
    this.setState({
      showCommentForm: !this.state.showCommentForm
    })
  }

  render () {
    return this.state.showCommentForm ? (
      <form className={'list-group-item form-inline w-100'}
            onSubmit={this.editComment.bind(this)}
            id={'CommentEditForm'}>
        <label className={'sr-only'} htmlFor="commentBody">Comment Text</label>
        <textarea className="form-control mb-2 mr-sm-2"
                  id="commentBody"
                  onChange={this.handleCommentChange.bind(this)}
                  value={this.state.commentData.body}
                  placeholder="Comment" />
        <div className={'btn-group ml-auto mr-0'}>
          <button type="submit" className="btn btn-primary mb-2" onClick={this.editComment.bind(this)}>Submit</button>
          <button className="btn btn-warning mb-2 cancel-edit-comment" onClick={this.toggleCommentForm.bind(this)}>Cancel</button>
        </div>
      </form>
    ) : (
      <div className={'list-group-item d-flex'}>
        <div>{ this.props.comment.body }</div>
        <div className={'btn-group ml-auto mr-0'}>
          <button className={'btn btn-info edit-comment'}
                  id={`editCommentButton-${this.props.comment.id}`}
                  onClick={this.toggleCommentForm.bind(this)}>Edit</button>
          <button className={'btn btn-danger'}>Delete</button>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
  onEditComment: PropTypes.func.isRequired
}

export default Comment

import React from 'react'
import PropTypes from 'prop-types'

class ArticleForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      article: props.article ? props.article : {
        title: 'New Article',
        body: ''
      }
    }
  }

  handleTitleChange (event) {
    this.setState({
      article: {
        ...this.state.article,
        title: event.target.value
      }
    })
  }

  handleBodyChange (event) {
    this.setState({
      article: {
        ...this.state.article,
        body: event.target.value
      }
    })
  }

  render () {
    return (
      <form id={this.props.formID}>
        <div className={'form-group'}>
          <label htmlFor={'title'}>Title</label>
          <input type={'text'}
                 className={'form-control'}
                 value={this.state.article.title}
                 name={'title'}
                 onChange={this.handleTitleChange.bind(this)}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor={'body'}>Body</label>
          <textarea value={this.state.article.body}
                    className={'form-control'}
                    name={'body'}
                    rows={25}
                    onChange={this.handleBodyChange.bind(this)}/>
        </div>
        <div className={'btn-group'}>
          <button className={'btn btn-warning'}
                  onClick={this.props.onCancel}>
            Cancel
          </button>
          <button type={'submit'}
                  className={'btn btn-success'}
                  onClick={event => this.props.onSubmit(event, this.state.article)}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

ArticleForm.propTypes = {
  article: PropTypes.object,
  formID: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ArticleForm

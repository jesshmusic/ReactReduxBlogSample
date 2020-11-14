import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ error, onCancel }) => (
  <div className={'px-5'}>
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Error</h4>
      <p>{error}</p>
      <button className={'btn btn-warning'} onClick={onCancel}>OK</button>
    </div>
  </div>
)
Error.propTypes = {
  error: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Error

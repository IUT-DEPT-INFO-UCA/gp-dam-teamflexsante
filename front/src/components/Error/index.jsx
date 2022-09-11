import React from 'react'
import PropTypes from 'prop-types'

const Error = (props) => {
  const { error, resetError } = props

  if (!error) {
    return null
  }

  return (
    <div className="error">
      <h1>{error}</h1>
      <button onClick={resetError}>Close</button>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired
}

export default Error

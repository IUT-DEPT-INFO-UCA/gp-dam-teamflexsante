import React from 'react'
import PropTypes from 'prop-types'

const Validation = (props) => {
  const { validation, resetValidation } = props

  if (!validation) {
    return null
  }

  return (
    <div className="validation">
      <h1>{validation}</h1>
      <button onClick={resetValidation}>Close</button>
    </div>
  )
}

Validation.propTypes = {
  validation: PropTypes.string.isRequired,
  resetValidation: PropTypes.func.isRequired
}

export default Validation

import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Snackbar } from '@mui/material'

const Error = (props) => {
  const { error, resetError } = props

  if (!error) {
    return null
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    resetError()
  }

  return (
    <Snackbar open={error !== ''} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired
}

export default Error

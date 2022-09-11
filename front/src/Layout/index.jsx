import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { RESET_ERROR, RESET_VALIDATION } from '../redux/store/app/actions'

import Error from '../components/Error'
import Validation from '../components/Validation'
import Home from '../pages/Home'

const Layout = (props) => {
  const { validation, error, resetError, resetValidation } = props

  useEffect(() => {
    resetError()
    resetValidation()
  }, [resetError, resetValidation])

  if (error || validation) {
    setTimeout(() => {
      resetError()
      resetValidation()
    }, 5000)
  }

  return (
    <BrowserRouter>
      <Validation validation={validation} resetValidation={resetValidation} />
      <Error error={error} resetError={resetError} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

Layout.propTypes = {
  validation: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired,
  resetValidation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  validation: state.app.validation,
  error: state.app.error
})

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch({ type: RESET_ERROR }),
  resetValidation: () => dispatch({ type: RESET_VALIDATION })
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

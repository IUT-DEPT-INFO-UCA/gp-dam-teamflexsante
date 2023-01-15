import React, { useEffect } from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { RELOAD_USER } from '../redux/store/user/actions'
import { CLEAR_ERROR, CLEAR_VALIDATION } from '../redux/store/app/slice'
import history from '../router/history'

import Error from '../components/Error'
import Validation from '../components/Validation'

const Layout = (props) => {
  const { validation, error, resetError, resetValidation, reloadUser } = props

  useEffect(() => {
    resetError()
    resetValidation()
    reloadUser()
  }, [resetError, resetValidation])

  if (error || validation) {
    setTimeout(() => {
      resetError()
      resetValidation()
    }, 5000)
  }

  return (
    <HistoryRouter history={history}>
      <Validation validation={validation} resetValidation={resetValidation} />
      <Error error={error} resetError={resetError} />
      {/* ROUTES */}
    </HistoryRouter>
  )
}

Layout.propTypes = {
  validation: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
  resetValidation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  validation: state.app.validation,
  error: state.app.error,
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch({ type: CLEAR_ERROR }),
  resetValidation: () => dispatch({ type: CLEAR_VALIDATION }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

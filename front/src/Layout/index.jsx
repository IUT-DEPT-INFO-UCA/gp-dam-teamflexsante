import React, { useEffect } from 'react'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import { RELOAD_USER } from '../redux/store/user/actions'
// import { CLEAR_ERROR, CLEAR_VALIDATION } from '../redux/store/app/slice'
import history from '../router/history'

import Error from '../components/Error'
import Validation from '../components/Validation'
import { routes } from '../router/routes'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Layout = () => {

  // useEffect(() => {
  //   resetError()
  //   resetValidation()
  //   reloadUser()
  // }, [resetError, resetValidation])

  // if (error || validation) {
  //   setTimeout(() => {
  //     resetError()
  //     resetValidation()
  //   }, 5000)
  // }

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Routes>
    </HistoryRouter>
  )
}

Layout.propTypes = {
  validation: PropTypes.string,
  error: PropTypes.string,
  user: PropTypes.object,
  resetError: PropTypes.func,
  resetValidation: PropTypes.func,
}

const mapStateToProps = (state) => ({
  validation: state.app.validation,
  error: state.app.error,
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  // resetError: () => dispatch({ }),
  // resetValidation: () => dispatch({ }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

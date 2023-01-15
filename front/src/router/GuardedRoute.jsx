import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { routes } from './routes'

const GuardedRoute = ({ component: Component, auth }) => {
  return auth === true ? <Component /> : <Navigate to={routes.login} />
}

GuardedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
}

export default GuardedRoute

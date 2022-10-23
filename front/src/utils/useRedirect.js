import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../router/routes'

export default function useRedirect() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (
      user !== null &&
      (location.pathname === routes.login ||
        location.pathname === routes.register ||
        location.pathname === routes.forgotPassword)
    ) {
      navigate(routes.account)
    }
  }, [user])

  return null
}

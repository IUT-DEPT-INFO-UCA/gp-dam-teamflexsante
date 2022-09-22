import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { ReactComponent as Logo } from '../../assets/logo.svg'

const Header = (props) => {
  const { isConnected } = props
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate(routes.login)
  }

  const handleAccount = () => {
    navigate(routes.account)
  }

  const handleHome = () => {
    navigate(routes.home)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Typography
            color="secondary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: 1, cursor: 'pointer' }}
            onClick={handleHome}>
            {t('app.name')}
          </Typography>
          <Button
            onClick={isConnected ? handleAccount : handleLogin}
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<PersonIcon />}>
            {isConnected ? t('header.account') : t('header.login')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

Header.propTypes = {
  isConnected: PropTypes.bool.isRequired
}

export default Header

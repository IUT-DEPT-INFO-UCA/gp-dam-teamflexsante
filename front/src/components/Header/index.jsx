import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useTranslation } from 'react-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../router/routes'
import { ReactComponent as Logo } from '../../assets/logo.svg'

const Header = (props) => {
  const { isConnected, user } = props
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleLogin = () => {
    navigate(routes.login)
  }

  const handleAccount = () => {
    navigate(routes.account)
  }

  const handleHome = () => {
    navigate(routes.home)
  }

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          {isConnected ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 2
                }}>
                <Typography component="p" variant="p">
                  {user.firstname} {user.lastname}
                </Typography>
                <Typography component="p" variant="p">
                  {user.role}
                </Typography>
              </Box>
              <IconButton
                id="notification-button"
                aria-controls={open ? 'notification-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleNotificationClick}>
                <Badge badgeContent={user.notifications.length} color="secondary">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'notification-button'
                }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>
            </Box>
          ) : null}
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
  isConnected: PropTypes.bool.isRequired,
  user: PropTypes.object
}

export default Header

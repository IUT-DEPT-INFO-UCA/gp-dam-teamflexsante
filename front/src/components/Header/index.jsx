import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Badge, Box, Button, IconButton, Menu, Toolbar, Typography } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { routes } from '../../router/routes'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ACCEPT_REQUEST_ADD_MEMBER } from '../../redux/store/user/actions'
import useMobile from '../../utils/useMobile'

const Header = (props) => {
  const { isConnected, user } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMobile = useMobile()

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

  const handleAcceptNotification = (notification) => {
    dispatch({
      type: ACCEPT_REQUEST_ADD_MEMBER,
      payload: {
        notificationId: notification.id,
        email: notification.from.email
      }
    })
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
              {!isMobile ? (
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
              ) : null}

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
                {user.notifications.map((notification, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 1,
                      borderBottom: '1px solid #ccc'
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                      <Typography
                        component="p"
                        variant="p"
                        sx={{
                          fontWeight: 'italic',
                          fontSize: 12
                        }}>
                        {new Date(notification.date).toLocaleDateString()}
                      </Typography>
                      <Typography component="p" variant="p">
                        {t('header.notification.' + notification.type, {
                          name: notification.from.lastname + ' ' + notification.from.firstname
                        })}
                      </Typography>
                    </Box>
                    <IconButton
                      aria-label="accept"
                      size="small"
                      color="success"
                      variant="contained"
                      sx={{ ml: 1 }}
                      onClick={() => {
                        handleClose()
                        handleAcceptNotification(notification)
                      }}>
                      <CheckIcon fontSize="inherit" color="action" />
                    </IconButton>
                  </Box>
                ))}
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

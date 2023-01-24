import { Box, Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_LOGIN } from '../../redux/store/user/actions'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    dispatch({
      type: USER_LOGIN,
      data: {
        email: data.get('email'),
        password: data.get('password')
      }
    })
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: 'background.default'
      }}>
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 3,
          textAlign: 'center'
        }}>
        <Typography component="h1" variant="h5">
          {t('login.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('login.email')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }}>
            {t('login.submit')}
          </Button>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Link
              onClick={handleRegister}
              variant="body2"
              color="#000"
              sx={{
                cursor: 'pointer'
              }}>
              {t('login.noAccount')}
            </Link>
          </Grid>
        </Box>
      </Card>
    </Box>
  )
}

export default Login
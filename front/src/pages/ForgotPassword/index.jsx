import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">
            {t('forgotPassword.title')}
          </Typography>
          <Typography align="left" component="p" margin="normal" sx={{ mt: 3, mb: 1 }} variant="p">
            {t('forgotPassword.text')}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('forgotPassword.email')}
            name="email"
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }}>
            {t('forgotPassword.submit')}
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default ForgotPassword

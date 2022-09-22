import { Box, Card } from '@mui/material'
import React from 'react'

const ForgotPassword = () => {
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
        TODO
      </Card>
    </Box>
  )
}

export default ForgotPassword

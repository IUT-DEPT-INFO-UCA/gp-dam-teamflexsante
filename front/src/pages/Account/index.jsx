import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Card, Divider, Typography } from '@mui/material'

import './styles.css'

const Account = () => {
  const { t } = useTranslation()
  const { user } = useSelector((state) => state.user)

  const renderInfo = (label, value) => (
    <>
      <Typography component="p" variant="p">
        {label}
      </Typography>
      <Typography component="h1" variant="h6">
        {value}
      </Typography>
      <Divider className="divider" />
    </>
  )

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
          maxWidth: 600,
          padding: 3
        }}>
          <Typography
          component="h1"
          variant="h4"
          sx={{
            marginBottom: 2
          }}>
          {t('personalInfo.title')}
        </Typography>
        {renderInfo(t('personalInfo.lastname'), user.lastname)}
        {renderInfo(t('personalInfo.firstname'), user.firstname)}
        {renderInfo(t('personalInfo.sex'), user.gender === 'men' ? 'Homme' : 'Femme')}
        {renderInfo(
          t('personalInfo.age'),
          `${new Date().getFullYear() - new Date(user.birthdate).getFullYear()} ans`
        )}
        {renderInfo(t('personalInfo.email'), user.email)}
        {renderInfo(t('personalInfo.phone'), user.phone)}
        {renderInfo(t('personalInfo.address'), user.address)}
      </Card>
    </Box>
  )
}

export default Account
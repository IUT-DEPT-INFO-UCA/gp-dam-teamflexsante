import React, { useState } from 'react'
import { Box, Button, Paper, SpeedDial, SpeedDialIcon, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'

import MemberCard from '../MemberCard'

const PersonalCircle = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setOpen(false)
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    console.log(email)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.default'
      }}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          marginBottom: '20px'
        }}>
        {t('personalCircle.title')}
      </Typography>
      <Paper
        sx={{
          width: '100%',
          padding: 3
        }}>
        <Typography component="h2" variant="h5">
          {t('personalCircle.medical')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '20px',
            gap: '10px'
          }}>
          <MemberCard
            role="Médecin"
            name="Dr. Jean Dupont"
            email="jean.dupont@medecin.com"
            phone="06 12 34 56 78"
          />
          <MemberCard
            role="Infirmier"
            name="Mme. Marie Dupont"
            email="marie.dupont@infirmer.com"
            phone="06 12 34 56 78"
          />
        </Box>
      </Paper>
      <Paper
        sx={{
          width: '100%',
          padding: 3,
          marginTop: '20px'
        }}>
        <Typography component="h2" variant="h5">
          {t('personalCircle.family')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '20px',
            gap: '10px'
          }}>
          <MemberCard
            role="Famille"
            name="Mme. Emilie Duclair"
            email="emilie.duclair@famille.com"
            phone="06 12 34 56 78"
          />
        </Box>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{t('personalCircle.add.title')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('personalCircle.add.text')}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              id="name"
              label={t('personalCircle.add.email')}
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('personalCircle.add.cancel')}</Button>
            <Button type="submit">{t('personalCircle.add.submit')}</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleClickOpen}></SpeedDial>
    </Box>
  )
}

export default PersonalCircle

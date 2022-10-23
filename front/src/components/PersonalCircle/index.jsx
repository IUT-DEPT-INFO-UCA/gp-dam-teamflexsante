import React, { useState } from 'react'
import { Box, Button, Paper, SpeedDial, SpeedDialIcon, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import MemberCard from '../MemberCard'
import { GET_GROUP_INFO, SEND_NOTIFICATION_ADD_MEMBER } from '../../redux/store/user/actions'
import { useEffect } from 'react'

const PersonalCircle = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user, group } = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  const patients = []
  const medicalStaff = []
  const family = []

  useEffect(() => {
    if (user) {
      dispatch({ type: GET_GROUP_INFO, payload: user.group })
    }
  }, [user])

  if (group) {
    group.forEach((member) => {
      if (member.role === 'patient') {
        patients.push(member)
      } else if (member.role === 'doctor' || member.role === 'nurse') {
        medicalStaff.push(member)
      } else if (member.role === 'family') {
        family.push(member)
      }
    })
  }

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
    dispatch({ type: SEND_NOTIFICATION_ADD_MEMBER, payload: { email } })
  }

  const renderGroup = (title, members) => (
    <Paper
      sx={{
        width: '100%',
        padding: 3,
        marginBottom: 2
      }}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: '20px',
          gap: '10px'
        }}>
        {members.map((member, index) => (
          <MemberCard
            key={index}
            role={member.role}
            name={member.lastname + ' ' + member.firstname}
            email={member.email}
            phone={member.phone}
          />
        ))}
      </Box>
    </Paper>
  )

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
      {patients.length ? renderGroup(t('personalCircle.patient'), patients) : null}
      {medicalStaff.length ? renderGroup(t('personalCircle.medical'), medicalStaff) : null}
      {family.length ? renderGroup(t('personalCircle.family'), family) : null}
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
        sx={{ position: 'fixed', bottom: 46, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleClickOpen}></SpeedDial>
    </Box>
  )
}

export default PersonalCircle

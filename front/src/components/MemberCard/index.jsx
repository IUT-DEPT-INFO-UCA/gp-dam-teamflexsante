import React from 'react'
import { Card, Typography } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import PropTypes from 'prop-types'

const MemberCard = (props) => {
  const { name, role, email, phone } = props

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 3
      }}>
      <Typography
        component="p"
        variant="p"
        sx={{
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
        {name}
      </Typography>
      <Typography
        component="p"
        variant="p"
        sx={{
          fontSize: '14px',
          marginBottom: '10px'
        }}>
        {role}
      </Typography>
      <Typography
        component="a"
        variant="p"
        href={`tel:${phone}`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
        <LocalPhoneIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
        {phone}
      </Typography>
      <Typography
        component="a"
        variant="p"
        href={`mailto:${email}`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <EmailIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
        {email}
      </Typography>
    </Card>
  )
}

MemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
}

export default MemberCard

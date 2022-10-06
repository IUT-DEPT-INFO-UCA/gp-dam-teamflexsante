import { Box, Card, Divider, Typography } from '@mui/material'
import React from 'react'

import './styles.css'

const PersonalInfo = () => {
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
          padding: 3
        }}>
        {/*   Le Nom    */}
        <Typography component="h1" variant="h5">
          Nom :
        </Typography>
        <Typography component="p" variant="p">
          riri
        </Typography>
        <Divider className="divider" />
        {/*   Le Prénom    */}
        <Typography component="h1" variant="h5">
          Prénom :
        </Typography>
        <Typography component="p" variant="p">
          toto
        </Typography>
        <Divider className="divider" />
        {/*   Le Sexe    */}
        <Typography component="h1" variant="h5">
          Sexe :
        </Typography>
        <Typography component="p" variant="p">
          Male
        </Typography>
        <Divider className="divider" />
        {/*   L'Age    */}
        <Typography component="h1" variant="h5">
          Age :
        </Typography>
        <Typography component="p" variant="p">
          86 ans
        </Typography>
        <Divider className="divider" />
        {/*   L'Email    */}
        <Typography component="h1" variant="h5">
          Email :
        </Typography>
        <Typography component="p" variant="p">
          toto.riri@gmail.com
        </Typography>
        <Divider className="divider" />
        {/*   Numéro de téléphone    */}
        <Typography component="h1" variant="h5">
          Numéro de téléphone :
        </Typography>
        <Typography component="p" variant="p">
          06 75 83 96 64
        </Typography>
        <Divider className="divider" />
        {/*   l'Adresse    */}
        <Typography component="h1" variant="h5">
          Adresse :
        </Typography>
        <Typography component="p" variant="p">
          12 rue des Polites
        </Typography>
      </Card>
    </Box>
  )
}

export default PersonalInfo

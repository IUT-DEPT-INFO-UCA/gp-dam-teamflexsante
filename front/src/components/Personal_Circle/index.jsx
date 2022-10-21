import * as React from 'react'
import { Box, Button, Card, Divider, Typography } from '@mui/material'

import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import Doctor_card from '../../components/Personal_Circle/Doctor_card'
import Nurse_card from '../../components/Personal_Circle/Nurse_card'
import Family_card from '../../components/Personal_Circle/Family_card'

const Personal_Circle = () => {
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
        <Typography component="h2" variant="h5">
          Corps Médical :
        </Typography>
        {/*</Doctor_card({"name","tel","mail"})>
        arrivé a faire passer un nom,tel,mail,role pour family*/}
        <Doctor_card />
        <Divider className="divider" />
        <Nurse_card />
        <Divider className="divider" />
        {/*   Button     */}
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Button variant="contained" endIcon={<SendIcon />}>
            Ajouter des Personnes
          </Button>
        </Stack>
      </Card>
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 3
        }}>
        <Typography component="h2" variant="h5">
          Personne(s) Proche(s) :
        </Typography>
        <Family_card />
        <Divider className="divider" />
        {/*   Button     */}
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Button variant="contained" endIcon={<SendIcon />}>
            Ajouter des Personnes
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default Personal_Circle

import * as React from 'react'
import { Box, Button, Card, Divider, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import Doctor_card from '../../components/Personal_Circle/Doctor_card'
import Nurse_card from '../../components/Personal_Circle/Nurse_card'
import Family_card from '../../components/Personal_Circle/Family_card'

const Personal_Circle = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
          padding: 3
        }}>
        <Typography component="h2" variant="h5">
          Corps Médical :
        </Typography>
        {/*</Doctor_card({"name","tel","mail"})>
        arrivé a faire passer un nom,tel,mail,role pour family*/}
        <Divider className="divider" />
        <Doctor_card />
        <Divider className="divider" />
        <Nurse_card />
        <Divider className="divider" />
        {/*   Button     */}
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickOpen}>
            Ajouter une Personnes
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
        <Divider className="divider" />
        <Family_card />
        <Divider className="divider" />
        {/*   Button     */}
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickOpen}>
            Ajouter une Personnes
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Ajouter une Personne</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Merci d&apos;entrée l&apos;Email de la personne que vous voulez Ajouter
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Valider</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Card>
    </Box>
  )
}

export default Personal_Circle

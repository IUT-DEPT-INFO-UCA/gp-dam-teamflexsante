import { Box, Button, Card, Divider, Typography } from '@mui/material'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import * as React from 'react'

const FeelingForm = () => {
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
        {/*   Fatigue    */}
        <Typography component="h2" variant="h5">
          Fatigue ressenti :
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <RemoveCircleOutlineIcon />
          <Slider
            aria-label="Fatigue_ressenti "
            defaultValue={3}
            //getAriaValueText={returnSliderFatigue }
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
          <AddCircleOutlineIcon />
        </Stack>
        <Divider className="divider" />
        {/*   Stress     */}
        <Typography component="h2" variant="h5">
          Stress ressenti :
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <RemoveCircleOutlineIcon />
          <Slider
            aria-label="Stress_ressenti "
            defaultValue={3}
            //getAriaValueText={returnSliderStress }
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
          <AddCircleOutlineIcon />
        </Stack>
        <Divider className="divider" />
        {/*   Bien-être     */}
        <Typography component="h2" variant="h5">
          Bien-être ressenti :
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <RemoveCircleOutlineIcon />
          <Slider
            aria-label="Bien-être_ressenti "
            defaultValue={3}
            //getAriaValueText={returnSliderBien-être }
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
          <AddCircleOutlineIcon />
        </Stack>
        <Divider className="divider" />
        {/*   Anxiété     */}
        <Typography component="h2" variant="h5">
          Anxiété ressenti :
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <RemoveCircleOutlineIcon />
          <Slider
            aria-label="Anxiété_ressenti "
            defaultValue={3}
            //getAriaValueText={returnSliderAnxiété }
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
          <AddCircleOutlineIcon />
        </Stack>
        <Divider className="divider" />
        {/*   comboBox     */}
        <Stack alignItems="center">
          <TextField
            fullWidth
            multiline
            label="Une douleur à nous signaler ?"
            alignItems="center"
          />
        </Stack>
        <Divider className="divider" />
        {/*   Button     */}
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Button variant="contained" endIcon={<SendIcon />}>
            Envoyer mes Données
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default FeelingForm

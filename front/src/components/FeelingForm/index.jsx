import * as React from 'react'
import { Box, Button, Card, Divider, Typography } from '@mui/material'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { SUBMIT_FEELING_FORM } from '../../redux/store/user/actions'

const FeelingForm = (props) => {
  const { submitFeelingForm } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    submitFeelingForm({
      date: data.get('date'),
      tiredness: data.get('tiredness'),
      stress: data.get('stress'),
      happiness: data.get('happiness'),
      anxiety: data.get('anxiety'),
      note: data.get('note') || ''
    })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        {/* hidden input for current date */}
        <input type="hidden" name="date" value={new Date().toISOString()} />
        {/*   Fatigue    */}
        <Typography component="h2" variant="h5">
          Fatigue ressenti :
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <RemoveCircleOutlineIcon />
          <Slider
            aria-label="Fatigue_ressenti"
            defaultValue={3}
            name="tiredness"
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
            name="stress"
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
            name="happiness"
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
            name="anxiety"
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
            name="note"
          />
        </Stack>
        <Divider className="divider" />
        {/*   Button     */}
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            Envoyer mes Données
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

FeelingForm.propTypes = {
  submitFeelingForm: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  submitFeelingForm: (data) => dispatch({ type: SUBMIT_FEELING_FORM, payload: data })
})

export default connect(mapStateToProps, mapDispatchToProps)(FeelingForm)

import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Register = () => {
  const { t } = useTranslation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)
  }

  const [sexe, setSexe] = React.useState('')

  const handleChange = (event) => {
    setSexe(event.target.value)
  }

  const [state, setState] = React.useState('')

  const handleChangeState = (event) => {
    setState(event.target.value)
  }

  const [value, setValue] = React.useState(dayjs())

  const handleChangeTitle = (newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
        backgroundColor: 'background.default'
      }}>
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 3,
          textAlign: 'center'
        }}>
        <Typography component="h1" variant="h5">
          {t('register.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth required>
            <InputLabel id="state">{t('register.state')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="state"
              value={state}
              onChange={handleChangeState}>
              <MenuItem value={'patient'}>{t('register.state.patient')}</MenuItem>
              <MenuItem value={'family'}>{t('register.state.family')}</MenuItem>
              <MenuItem value={'nurse'}>{t('register.state.nurse')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={t('register.name')}
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="surname"
            label={t('register.surname')}
            id="surname"
          />
          <Box sx={{ mt: 2, mb: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id="gender">{t('register.gender')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="gender"
                value={sexe}
                onChange={handleChange}>
                <MenuItem value={'man'}>{t('register.gender.man')}</MenuItem>
                <MenuItem value={'woman'}>{t('register.gender.woman')}</MenuItem>
                <MenuItem value={'other'}>{t('register.gender.other')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 3, mb: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} required margin="normal">
              <Stack>
                <MobileDatePicker
                  label={t('register.dob')}
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChangeTitle}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label={t('register.address')}
            id="address"
          />
          <TextField
            margin="normal"
            fullWidth
            name="address2"
            label={t('register.address2')}
            id="address2"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="postcode"
            label={t('register.postcode')}
            id="postcode"
            type="number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label={t('register.city')}
            id="city"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('register.email')}
            name="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('register.password')}
            type="password"
            id="password"
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }}>
            {t('register.submit')}
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
export default Register

import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from 'react-redux'
import { USER_REGISTER } from '../../redux/store/user/actions'

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [birthdate, setBirthdate] = useState(dayjs())
  const [sexe, setSexe] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
      gender: sexe,
      birthdate: birthdate,
      phone: data.get('phone'),
      address:
        data.get('address') +
        ' ' +
        data.get('address2') +
        ' ' +
        data.get('postcode') +
        ' ' +
        data.get('city'),
      role: data.get('role')
    }
    dispatch({
      type: USER_REGISTER,
      data: payload
    })
  };

  const handleChange = (event) => {
    setSexe(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value)
  }

  const handleChangeBirthdate = (newValue) => {
    setBirthdate(newValue)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
        backgroundColor: "background.default",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {t("register.title")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth required>
            <InputLabel id="state">{t('register.state')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="role"
              id="state"
              value={role}
              onChange={handleChangeRole}>
              <MenuItem value={'patient'}>{t('register.state.patient')}</MenuItem>
              <MenuItem value={'family'}>{t('register.state.family')}</MenuItem>
              <MenuItem value={'nurse'}>{t('register.state.nurse')}</MenuItem>
              <MenuItem value={'doctor'}>{t('register.state.doctor')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label={t("register.name")}
            name="lastname"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstname"
            label={t("register.surname")}
            id="surname"
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel id="gender">{t("register.gender")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="gender"
              name="gender"
              value={sexe}
              onChange={handleChange}
            >
              <MenuItem value={"men"}>{t("register.gender.man")}</MenuItem>
              <MenuItem value={"women"}>{t("register.gender.woman")}</MenuItem>
              <MenuItem value={"other"}>{t("register.gender.other")}</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ my: 1 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              required
              margin="normal"
            >
              <Stack>
                <MobileDatePicker
                  label={t("register.dob")}
                  name="birthdate"
                  inputFormat="DD/MM/YYYY"
                  value={birthdate}
                  onChange={handleChangeBirthdate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="adress"
            label={t("register.adress")}
            id="adress"
          />
          <TextField
            margin="normal"
            fullWidth
            name="adress2"
            label={t("register.adress2")}
            id="adress2"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="postcode"
            label={t("register.postcode")}
            id="postcode"
            type="number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label={t("register.city")}
            id="city"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("register.email")}
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label={t('register.phone')}
            id="phone"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("register.password")}
            type="password"
            id="password"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("register.submit")}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
export default Register;

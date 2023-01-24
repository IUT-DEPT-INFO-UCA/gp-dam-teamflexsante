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
import React from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Register = () => {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const [sexe, setSexe] = React.useState("");

  const handleChange = (event) => {
    setSexe(event.target.value);
  };

  const [value, setValue] = React.useState(dayjs());

  const handleChangeTitle = (newValue) => {
    setValue(newValue);
  };

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
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={t("register.name")}
            name="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="surname"
            label={t("register.surname")}
            id="surname"
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel id="gender">{t("register.gender")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="gender"
              value={sexe}
              onChange={handleChange}
            >
              <MenuItem value={"man"}>{t("register.gender.man")}</MenuItem>
              <MenuItem value={"woman"}>{t("register.gender.woman")}</MenuItem>
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

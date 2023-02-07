import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import BarChartIcon from "@mui/icons-material/BarChart";

import HealthInfo from "../../components/HealthInfo";
import PersonalInfo from "../../components/PersonalInfo";
import useMobile from "../../utils/useMobile";

import "./styles.css";

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Account = () => {
  const [value, setValue] = useState(0);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const isMobile = useMobile();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return isMobile ? (
    <Box>
      {bottomNavValue === 0 && <PersonalInfo />}
      {bottomNavValue === 1 && <HealthInfo />}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
          }}
        >
          <BottomNavigationAction label="Infos" icon={<PermIdentityIcon />} />
          <BottomNavigationAction label="Données" icon={<BarChartIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  ) : (
    <div>
      <Box
        className="AccountSelector"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Information Personnel" {...a11yProps(0)} />
          <Tab label="Données de santé" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PersonalInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HealthInfo />
      </TabPanel>
    </div>
  );
};

export default Account;

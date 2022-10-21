import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import FeelingForm from '../../components/FeelingForm'
import HealthInfo from '../../components/HealthInfo'
import PersonalInfo from '../../components/PersonalInfo'

import './styles.css'

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Account = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <Box className="AccountSelector" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Information Personnel" {...a11yProps(0)} />
          <Tab label="Diagrame" {...a11yProps(1)} />
          <Tab label="Vos Sentiment" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PersonalInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HealthInfo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FeelingForm />
      </TabPanel>
    </div>
  )
}

export default Account

import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SimpleLineChart from '../SimpleLineChart'
import TwoLinesChart from '../TwoLinesChart'

const HealthInfo = (props) => {
  const { t } = useTranslation()
  const { user } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'background.default'
      }}>
      <Typography component="h1" variant="h5">
        {t('healthInfo.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
          width: '100%'
        }}>
        <SimpleLineChart
          data={user.health.heartRate}
          title={t('healthInfo.heartRate')}
          unit={t('healthInfo.heartRate.unit')}
        />
        <TwoLinesChart
          data={user.health.bloodPressure}
          title={t('healthInfo.bloodPressure')}
          unit={t('healthInfo.bloodPressure.unit')}
        />
        <SimpleLineChart
          data={user.health.bloodOxygen}
          title={t('healthInfo.bloodOxygen')}
          unit={t('healthInfo.bloodOxygen.unit')}
        />
        <SimpleLineChart
          data={user.health.sleep}
          title={t('healthInfo.sleep')}
          unit={t('healthInfo.sleep.unit')}
        />
        <SimpleLineChart
          data={user.health.stress}
          title={t('healthInfo.stress')}
          unit={t('healthInfo.stress.unit')}
        />
        <SimpleLineChart
          data={user.health.temperature}
          title={t('healthInfo.temperature')}
          unit={t('healthInfo.temperature.unit')}
        />
      </Box>
    </Box>
  )
}

HealthInfo.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HealthInfo)

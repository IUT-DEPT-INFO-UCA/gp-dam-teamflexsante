import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import SimpleLineChart from '../SimpleLineChart'
import TwoLinesChart from '../TwoLinesChart'
import { GENERATE_FAKE_DATA, GET_GROUP_INFO } from '../../redux/store/user/actions'
import MemberCard from '../MemberCard'
import FeelingChart from '../FeelingChart'

const HealthInfo = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user, group } = useSelector((state) => state.user)
  const patients = []
  const [patient, setPatient] = useState(null)

  useEffect(() => {
    if (user) {
      dispatch({ type: GET_GROUP_INFO, payload: user.group })
    }
  }, [user])

  if (group) {
    group.forEach((member) => {
      if (member.role === 'patient') {
        patients.push(member)
      }
    })
  }

  const handleGenerateFakeData = () => {
    dispatch({ type: GENERATE_FAKE_DATA })
  }

  const handleSelectPatient = (patient) => {
    setPatient(patient)
  }

  const renderCharts = (health) => (
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
        data={health.heartRate}
        title={t('healthInfo.heartRate')}
        unit={t('healthInfo.heartRate.unit')}
        role={user.role}
      />
      <TwoLinesChart
        data={health.bloodPressure}
        title={t('healthInfo.bloodPressure')}
        unit={t('healthInfo.bloodPressure.unit')}
        role={user.role}
      />
      <FeelingChart feelings={health.feeling} title={t('healthInfo.feeling')} />
      {user.role !== 'family' && (
        <SimpleLineChart
          data={health.bloodOxygen}
          title={t('healthInfo.bloodOxygen')}
          unit={t('healthInfo.bloodOxygen.unit')}
          role={user.role}
        />
      )}
      <SimpleLineChart
        data={health.sleep}
        title={t('healthInfo.sleep')}
        unit={t('healthInfo.sleep.unit')}
        role={user.role}
      />
      {user.role !== 'family' && (
        <SimpleLineChart
          data={health.stress}
          title={t('healthInfo.stress')}
          unit={t('healthInfo.stress.unit')}
          role={user.role}
        />
      )}
      <SimpleLineChart
        data={health.temperature}
        title={t('healthInfo.temperature')}
        unit={t('healthInfo.temperature.unit')}
        role={user.role}
      />
    </Box>
  )

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
      <Button onClick={handleGenerateFakeData}>{t('healthInfo.generate')}</Button>
      {user.role === 'patient' ? (
        renderCharts(user.health)
      ) : (
        <>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              marginTop: 2,
              width: '100%',
              textAlign: 'center'
            }}>
            {t('healthInfo.patients')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              marginTop: 2
            }}>
            {patients.map((member, index) => (
              <MemberCard
                key={index}
                name={member.lastname + ' ' + member.firstname}
                role={member.role}
                email={member.email}
                phone={member.phone}
                isSelected={patient && patient.email === member.email}
                onMemberClick={() => handleSelectPatient(member)}
              />
            ))}
          </Box>
          {patient && renderCharts(patient.health)}
        </>
      )}
    </Box>
  )
}

export default HealthInfo

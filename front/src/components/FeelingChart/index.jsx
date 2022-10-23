/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Tooltip, Typography } from '@mui/material'
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useTranslation } from 'react-i18next'

const FeelingChart = (props) => {
  const { title, feelings } = props
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        marginTop: '30px',
        width: '100%'
      }}>
      <Typography component="h1" variant="h6">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width="100%"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          data={feelings}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()} / ${d.getMonth() + 1}`
            }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()} / ${d.getMonth() + 1}`
            }}
            formatter={(note) => `Note : ${note}`}
          />
          <Legend
            formatter={(value) => {
              return t('feelingsChart.' + value)
            }}
          />
          <Bar dataKey="tiredness" fill="#8884d8" />
          <Bar dataKey="stress" fill="#82ca9d" />
          <Bar dataKey="happiness" fill="#ffc658" />
          <Bar dataKey="anxiety" fill="#ff0000" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

FeelingChart.propTypes = {
  title: PropTypes.string.isRequired,
  feelings: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      tiredness: PropTypes.number.isRequired,
      stress: PropTypes.number.isRequired,
      happiness: PropTypes.number.isRequired,
      anxiety: PropTypes.number.isRequired,
      note: PropTypes.string.isRequired
    })
  ).isRequired
}

export default FeelingChart

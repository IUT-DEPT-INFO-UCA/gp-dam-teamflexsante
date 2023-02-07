import React, { useMemo, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PropTypes from 'prop-types'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

const SimpleLineChart = (props) => {
  const { data, title, unit } = props

  const reversedData = useMemo(() => {
    const reversed = [...data]
    return reversed.reverse()
  }, [data])

  const [period, setPeriod] = useState('1m')

  const handlePeriod = (event, newTime) => {
    setPeriod(newTime)
  }

  const dataToShow = useMemo(() => {
    if (period === '1w') {
      return reversedData.slice(-7)
    }
    if (period === '1m') {
      return reversedData.slice(-30)
    }
    if (period === '3m') {
      return reversedData.slice(-90)
    }
    if (period === '6m') {
      return reversedData.slice(-180)
    }
    if (period === '1y') {
      return reversedData
    }
    return reversedData
  }, [reversedData, period])

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
        <LineChart
          width="100%"
          data={dataToShow}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()} / ${d.getMonth() + 1}`
            }}
          />
          <YAxis dataKey="value" />
          <Tooltip
            labelFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()} / ${d.getMonth() + 1}`
            }}
            formatter={(value) => `${value} ${unit}`}
          />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <ToggleButtonGroup value={period} exclusive onChange={handlePeriod}>
        <ToggleButton value="1w">7j</ToggleButton>
        <ToggleButton value="1m">1m</ToggleButton>
        <ToggleButton value="3m">3m</ToggleButton>
        <ToggleButton value="6m">6m</ToggleButton>
        <ToggleButton value="1y">1a</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

SimpleLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired
}

export default SimpleLineChart
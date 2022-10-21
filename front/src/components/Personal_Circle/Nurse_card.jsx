import React from 'react'
import { Box, Card, Typography } from '@mui/material'

//const Nurse_card = (name, tel, mail) => {
const Nurse_card = () => {
  var name = 'Irvette Colap'
  var tel = '06 75 83 96 64'
  var mail = 'Irvette.Colap@FlexSante.fr'
  return (
    <Box>
      <Typography component="p" variant="p">
        Infirmiére
      </Typography>
      <Card>
        <Typography component="p" variant="p">
          name :{name}
        </Typography>
        <Typography component="p" variant="p">
          Tel : {tel}
        </Typography>
        <Typography component="p" variant="p">
          mail : {mail}
        </Typography>
      </Card>
    </Box>
  )
}

export default Nurse_card

import React from 'react'
import { Box, Card, Typography } from '@mui/material'

//const Doctor_card = (name, tel, mail) => {
const Doctor_card = () => {
  var name = 'DR Philipe Train name'
  var tel = '06 75 83 96 64'
  var mail = 'Philipe.Train@FlexSante.fr'
  return (
    <Box>
      <Typography component="p" variant="p">
        Medecin
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

export default Doctor_card

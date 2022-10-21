import React from 'react'
import { Box, Card, Typography } from '@mui/material'

//const Family_card = (name, tel, mail) => {
const Family_card = () => {
  var role = 'Parent (mére)'
  var name = 'Christiane Friche'
  var tel = '06 75 83 96 64'
  var mail = 'Christiane.Friche@FlexSante.fr'
  return (
    <Box>
      <Typography component="p" variant="p">
        {role}
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

export default Family_card

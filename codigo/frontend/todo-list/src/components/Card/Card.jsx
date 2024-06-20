import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Todo
      </Typography>
      <Typography variant="h5" component="div">
        Comprar leite
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        09/10/2021
      </Typography>
      <Typography variant="body2">
        Ir no mercado comprar leite
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" sx={{color: 'red'}}>Excluir</Button>
      <Button size="small" sx={{color: 'yellow'}}>Editar</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

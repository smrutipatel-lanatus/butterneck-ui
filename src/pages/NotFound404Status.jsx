import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import error from '../assets/images/404error.png';

export function NotFound404Status() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Grid container gap={2} sx={{ textAlign: 'center' }} alignItems="center" justifyContent="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            mb: 1,
            height: '300px',
            backgroundImage: `url(${error})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Grid item xs={12} md={6} sx={{ border: '2px solid #331E6D', padding: 1 }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ color: '#331E6D' }}>
            Oops We can't find that page!
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/');
            }}
          >
            GO BACK
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

import { useTheme } from '@emotion/react';
import { Button, Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../common/TextInput';
import { PageLoading } from '../components/PageLoading';
import useMutationApi from '../hooks/useMutationApi';

export function Signup() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', organization: '' });

  const navigate = useNavigate();
  const theme = useTheme();

  const {
    mutate: signup,
    data: signupResponse,
    status: signupStatus,
    isLoading,
  } = useMutationApi({
    endpoint: '/auth/register',
  });

  useEffect(() => {
    if (signupStatus === 'success' && signupResponse) {
      const { token } = signupResponse;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ` + token;

      if (localStorage.getItem('token')) {
        navigate('/');
      }
    }
  }, [signupResponse, navigate, signupStatus]);

  async function signupUser() {
    const { name, email, password, organization } = userData;

    if (name && email && password && organization) {
      signup({ name, email, password, organization });
    }
  }
  const styles = {
    card: {
      width: 400,
      maxWidth: 400,
      p: 3,
      margin: 'auto',
    },

    button: {
      textTransform: 'unset',
      borderRadius: '4px',
    },

    linkColor: {
      color: theme.palette.primary.main,
    },
  };

  return (
    <Grid container alignItems="center" minHeight="100vh">
      {isLoading && <PageLoading />}
      <Card variant="outlined" sx={styles.card}>
        <Typography variant="h5" fontWeight={700} mb={2} textAlign="center">
          Create an account
        </Typography>

        <form id="signupform">
          <TextInput
            title="Name"
            label="Name"
            name="SIGNUP_NAME"
            onChange={(event) => setUserData((prev) => ({ ...prev, name: event.target.value }))}
          />
          <TextInput
            title="Email"
            label="Email"
            name="SIGNUP_EMAIL"
            onChange={(event) => setUserData((prev) => ({ ...prev, email: event.target.value }))}
          />
          <TextInput
            title="Password"
            label="Password"
            name="SIGNUP_PASSWORD"
            isPasswordField
            onChange={(event) => setUserData((prev) => ({ ...prev, password: event.target.value }))}
          />
          <TextInput
            name="ORGANIZATION"
            label="Organization"
            title="Organization"
            onChange={(event) => setUserData((prev) => ({ ...prev, organization: event.target.value }))}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ ...styles.button, ...styles.submitButton, my: 1 }}
            onClick={() => signupUser()}
          >
            <Typography variant="body1">Sign up</Typography>
          </Button>

          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account? &nbsp;
            <Link to="/login" style={styles.linkColor}>
              Login here
            </Link>
          </Typography>
        </form>
      </Card>
    </Grid>
  );
}

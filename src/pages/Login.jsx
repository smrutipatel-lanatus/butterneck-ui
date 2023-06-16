import { Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/images/GoogleIcon';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput } from '../common/TextInput';
import { PageLoading } from '../components/PageLoading';
import useMutationApi from '../hooks/useMutationApi';

export function Login() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const {
    mutate: doLogin,
    data: loginResponse,
    status: loginStatus,
    isLoading,
  } = useMutationApi({
    endpoint: '/auth/login',
  });
  const theme = useTheme();

  const { dark } = theme.palette.primary;

  useEffect(() => {
    if (loginStatus === 'success' && loginResponse) {
      const { token } = loginResponse;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ` + token;

      if (localStorage.getItem('token')) {
        navigate('/');
      }
    }
  }, [loginResponse, navigate, loginStatus]);

  async function loginUser() {
    const { email, password } = userData;

    if (email && password) {
      doLogin(userData);
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

    submitButton: {
      mb: 1,
    },

    signUpButton: {
      display: 'flex',
      justifyContent: 'center',
    },
    forgotPassBtn: {
      textAlign: 'right',
      marginBottom: 1,
    },
    linkColor: {
      color: theme.palette.primary.main,
    },
  };
  return (
    <Grid container minHeight="100vh">
      {isLoading && <PageLoading />}
      <Card variant="outlined" sx={styles.card}>
        <Typography variant="h5" fontWeight={700} mb={2} textAlign="center">
          Login to your account.
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            ...styles.button,
            ...styles.authButton,
            borderColor: dark,
            ':hover': {
              borderColor: dark,
            },
          }}
        >
          <GoogleIcon width={20} />
          <Typography variant="body1" fontWeight="semibold" flex={1} color={dark}>
            Continue with Google
          </Typography>
        </Button>

        <Divider sx={{ my: 1, mt: 2 }}>
          <Typography variant="subtitle2">OR</Typography>
        </Divider>
        <form id="loginForm">
          <TextInput
            title="Email"
            label="Email"
            name="LOGIN_EMAIL"
            onChange={(event) => setUserData((prev) => ({ ...prev, email: event.target.value }))}
          />
          <TextInput
            title="Password"
            label="Password"
            name="LOGIN_PASSWORD"
            isPasswordField
            onChange={(event) => setUserData((prev) => ({ ...prev, password: event.target.value }))}
          />
          <Link to="/forgot-password" style={styles.linkColor}>
            <Typography variant="body2" sx={styles.forgotPassBtn}>
              Forgot Your Password?
            </Typography>
          </Link>
          <Button
            variant="contained"
            fullWidth
            sx={{ ...styles.button, ...styles.submitButton }}
            onClick={() => loginUser()}
          >
            <Typography variant="body1">Log in</Typography>
          </Button>
          <Typography variant="body2" sx={styles.signUpButton}>
            Don't have an account?&nbsp;
            <Link to="/signup" style={styles.linkColor}>
              Sign up here
            </Link>
          </Typography>
        </form>
      </Card>
    </Grid>
  );
}

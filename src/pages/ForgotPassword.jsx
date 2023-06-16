import { Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../common/TextInput';
import useMutationApi from '../hooks/useMutationApi';
import { PageLoading } from '../components/PageLoading';

export const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { mutateAsync: forgotPassword, isLoading } = useMutationApi({
    endpoint: '/auth/send-reset-link',
  });

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
      my: 1,
    },
    linkColor: {
      color: theme.palette.primary.main,
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email: e.target.EMAIL.value });
    navigate('/sign-up');
  };

  return (
    <Grid container minHeight="100vh">
      {isLoading && <PageLoading />}
      <Card variant="outlined" sx={styles.card}>
        <Typography variant="h5" fontWeight={700} mb={2} sx={{ textAlign: 'center' }}>
          Forgot your password?
        </Typography>
        <form id="forgotPassword" onSubmit={onSubmit}>
          <TextInput title="Email" type={'email'} label="Email" name="EMAIL" />
          <Button variant="contained" type="submit" fullWidth sx={styles.button}>
            <Typography variant="body1">Reset Password</Typography>
          </Button>
        </form>

        <Divider sx={{ my: 1 }} />

        <Link to="/login" style={styles.linkColor}>
          <Typography variant="body2" textAlign="right">
            Go Back
          </Typography>
        </Link>
      </Card>
    </Grid>
  );
};

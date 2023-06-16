import { Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextInput } from '../common/TextInput';
import { toast } from 'react-toastify';
import useMutationApi from '../hooks/useMutationApi';
import { PageLoading } from '../components/PageLoading';

export const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useParams();

  const { mutateAsync: resetPassword, isLoading } = useMutationApi({
    endpoint: '/auth/reset-password',
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
    const { NEW_PASSWORD, CONFIRM_PASSWORD } = e.target.elements;
    if (NEW_PASSWORD.value !== CONFIRM_PASSWORD.value) {
      toast.error('New password and confirm password must be same');
      return;
    }

    await resetPassword({
      token,
      password: NEW_PASSWORD.value,
    });
    toast.success('Password updated successfully');
    navigate('/login');
  };

  return (
    <Grid container minHeight="100vh">
      {isLoading && <PageLoading />}
      <Card variant="outlined" sx={styles.card}>
        <Typography variant="h5" fontWeight={700} mb={2} sx={{ textAlign: 'center' }}>
          Reset your password
        </Typography>

        <form id="forgotPassword" onSubmit={onSubmit}>
          <TextInput title="Enter a new password" label="Enter new password" name="NEW_PASSWORD" />
          <TextInput title="Confirm your password" label="Confirm your password" name="CONFIRM_PASSWORD" />
          <Button type="submit" variant="contained" fullWidth sx={styles.button}>
            <Typography variant="body1">Save my password</Typography>
          </Button>
        </form>

        <Divider sx={{ my: 1 }} />

        <Link to="/forgot-password" style={styles.linkColor}>
          <Typography variant="body2" textAlign="right">
            Go Back
          </Typography>
        </Link>
      </Card>
    </Grid>
  );
};

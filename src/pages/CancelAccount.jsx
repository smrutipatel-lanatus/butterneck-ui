import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const CancelAccountInstructionItem = ({ text }) => {
  return (
    <Grid container>
      <Grid item xs={1} sx={{ mt: '0.3rem' }}>
        <FiberManualRecordIcon fontSize="1px" />
      </Grid>
      <Grid item xs={11}>
        <Typography variant="subtitle1">{text}</Typography>
      </Grid>
    </Grid>
  );
};

export const CancelAccount = () => {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ mx: { xs: 4, sm: 15, md: 30, lg: 55 }, my: 3, p: 3, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }}>
        <Typography variant="h6" fontWeight={700} textAlign="center">
          Lanatus Systems
        </Typography>
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={1}>
          Are you sure you want to cancel your account?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We’ll be sorry to see you go, but thanks for giving Butterneck a try!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }} fontWeight={700}>
          When you cancel...
        </Typography>

        <CancelAccountInstructionItem text="You won't be billed again." />
        <CancelAccountInstructionItem text="Your account will be closed immediately." />
        <CancelAccountInstructionItem text="Your data will be permanently deleted from our servers within 30 days and from all backups within 60 days." />

        <Button sx={{ my: 1 }} fullWidth color="error" variant="outlined">
          Cancel Account
        </Button>
        <Button
          sx={{ my: 1 }}
          fullWidth
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Never mind
        </Button>
      </Card>
      <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
        Need help? Just <Link to=" ">contact our friendly support team.</Link>
      </Typography>
    </>
  );
};

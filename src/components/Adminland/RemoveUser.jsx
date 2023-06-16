import { Button, Card, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const CommonListComponent = ({ text }) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="subtitle1" mb={1}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};
export const RemoveUser = () => {
  const theme = useTheme();
  return (
    <>
      <Link to="/edit-info" style={{ color: theme.palette.primary.link, textAlign: 'center' }}>
        <Typography variant="body2" my={1}>
          ← Back to Alan’s info
        </Typography>
      </Link>
      <Card sx={{ mx: { xs: 4, sm: 15, md: 30, lg: 55 }, my: 5, p: 4 }}>
        <Typography variant="h4" textAlign="center" fontWeight={700} mb={2}>
          Remove Alan Walker?{' '}
        </Typography>
        <CommonListComponent text=" Here’s what’ll happen when you remove Alan from this account:" />

        <CommonListComponent text="• Alan will be removed from all projects and Pings on this account." />
        <CommonListComponent text="• They won’t be able to log in to this account in the future, unless you re-invite them." />
        <CommonListComponent text="• Everything they’ve posted will remain in place. Any to-dos, cards and steps assigned, will still show their name." />
        <Typography textAlign="center" color={theme.palette.primary.error} mb={1}>
          This cannot be undone!
        </Typography>
        <Button variant="outlined" fullWidth>
          Remove Alan completely
        </Button>
      </Card>
    </>
  );
};

import { Avatar, Card, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ProfileAndEditUserCustom } from '../../common/ProfileAndEditUserCustom';

export const EditUser = () => {
  const methods = useForm();
  const theme = useTheme();
  const submit = () => {
    console.log('hello');
  };
  return (
    <>
      <Link to="/people-access" style={{ textAlign: 'center', color: theme.palette.primary.link }}>
        <Typography variant="body2" my={1}>
          ← Back to Everyone on the account
        </Typography>
      </Link>
      <Typography variant="h4" fontWeight={700} display="flex" justifyContent="center" my={2}>
        Edit Alan's info
      </Typography>

      <Card sx={{ mx: { xs: 4, sm: 15, md: 30, lg: 55 }, my: 5, overflow: 'visible' }}>
        <Avatar sx={{ margin: 'auto', transform: 'translateY(-25%)', width: 100, height: 100 }}>
          <Typography variant="h2">A</Typography>
        </Avatar>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)}>
            <ProfileAndEditUserCustom isEditInfoSection />
          </form>
        </FormProvider>
        <Link to="/remove-user" style={{ color: theme.palette.link.linkColor, textAlign: 'center' }}>
          <Typography variant="subtitle1" py={2}>
            I want to remove alan from this account…
          </Typography>
        </Link>
      </Card>
    </>
  );
};

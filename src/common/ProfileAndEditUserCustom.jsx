import { Button, Divider, Grid } from '@mui/material';
import React from 'react';
import { FormInputField } from './input-components/FormInputField';

export const ProfileAndEditUserCustom = ({ isProfileSectionField, isEditInfoSection }) => {
  return (
    <Grid container px={{ xs: 4 }}>
      <Grid item xs={12}>
        <FormInputField name="USERNAME" label="Name" required />
      </Grid>
      <Grid item xs={12}>
        <FormInputField name="EMAIL" label="Email" type="email" required />
      </Grid>
      <Grid item xs={12}>
        <FormInputField name="TITLE" label="Title" />
      </Grid>
      {isEditInfoSection && (
        <Grid item xs={12}>
          <FormInputField name="COMPANY_ORGANIZATION" label="Company/Organization" />
        </Grid>
      )}
      {isProfileSectionField && (
        <>
          <Grid item xs={12}>
            <FormInputField name="Location" label="Location" />
          </Grid>
          <Grid item xs={12}>
            <FormInputField name="SHORT_BIO_CURRENT_STATUS" label="Short Bio or Current Status" />
          </Grid>
        </>
      )}
      <Button type="submit" variant="contained" fullWidth sx={{ mb: 4 }}>
        Save changes
      </Button>
      <Divider width="100%" />
    </Grid>
  );
};

import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormInputField } from './input-components/FormInputField';
import { FormDateField } from './input-components/FormDateField';

export const ProjectDialogCustom = () => {
  const [isScheduling, setIsScheduling] = useState(false);

  return (
    <>
      <FormInputField name="name" label="Name" placeholder="e.g. John Doe" required />

      <FormInputField
        name="description"
        label="Add an optional description"
        placeholder="e.g. Plans and scheduling"
        inputProps={{ multiline: true, rows: 4 }}
        required
      />

      <Box mb={2}>
        {isScheduling ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormDateField name="startDate" label="Start date" placeholder="Pick a date..." sx={{ mb: 1 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormDateField name="endDate" label="End date" placeholder="Pick a date..." sx={{ mb: 1 }} />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" fontWeight="bold">
            Project schedule
          </Typography>
        )}

        <Typography
          component="a"
          variant="body1"
          onClick={() => setIsScheduling((prev) => !prev)}
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {isScheduling ? 'Remove dates' : 'Add start/end dates'}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body1" fontWeight="bold">
          This project is Invite-only
        </Typography>

        <Typography variant="body1">Only people who are explicitely invited can see this project.</Typography>
      </Box>
    </>
  );
};

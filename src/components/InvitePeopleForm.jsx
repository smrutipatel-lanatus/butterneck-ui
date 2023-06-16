import { Cancel } from '@mui/icons-material';
import { Box, Grid, TextField } from '@mui/material';
import React from 'react';

const InvitePeopleForm = ({ onClose, id, name, handleNameChange }) => {
  return (
    <>
      <form>
        <Grid
          item
          container
          md={6}
          spacing={1}
          width="80%"
          alignItems="center"
          sx={{
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
            justifyContent: 'center',
            borderRadius: '10px',
            paddingBottom: 3,
            paddingRight: 3,
            marginTop: 2,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          mb="1"
        >
          {onClose && (
            <Box width="100%">
              <Cancel
                sx={{
                  position: 'absolute',
                  right: '-8px',
                  top: '-8px',
                  cursor: 'pointer',
                }}
                onClick={() => onClose(id)}
              />
            </Box>
          )}
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth label="Email Address" variant="outlined" required />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth label="Job Title (Optional)" variant="outlined" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth label="Company / Organization" variant="outlined" required />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default InvitePeopleForm;

import React from 'react';
import { Box } from '@mui/system';
import { Button, Divider, Grid, Typography, Checkbox, Select, MenuItem } from '@mui/material';
import { FiberManualRecordRounded } from '@mui/icons-material';

const DATA = [
  {
    Id: 1,
    Value: 'On the project',
  },
  {
    Id: 2,
    Value: 'Just following',
  },
];

export const SetupPeopleAccess = () => {
  const [active, setActive] = React.useState(DATA[0].Id);

  const onChange = (event) => {
    setActive(event.target.value);
  };
  return (
    <>
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', marginY: 3 }}>
        <Box sx={{ width: '80%', border: '1px solid black', borderRadius: '2rem' }}>
          <Grid
            container
            item
            xs={12}
            md={12}
            sx={{
              p: '1rem',
            }}
          >
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                What can {"'name'"} access?
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                p: { xs: '1rem', md: '1rem' },
                pl: { xs: '1rem', md: '5rem' },
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1">
                <b>FIRST,</b> check off projects they should be able to access. <b>THEN,</b> if they should be{' '}
                <Button variant="contained">On the project</Button> (their avatar will show up at the top and they'll be
                notified about Campfire chats) <Button variant="outlined">Just following</Button> they won't be notified
                unless someone specially @mentions them, assign them a to-do, or loops them into a thread.
              </Typography>
            </Box>
            <Box
              sx={{
                p: { md: '1rem' },
                pl: { md: '5rem' },
                width: { md: '60%' },
                float: { md: 'right' },
                display: { xs: 'none', md: 'flex' },
                pb: 0,
              }}
            >
              <Typography variant="subtitle1" sx={{ pl: { xs: '1rem', md: '5rem' } }}>
                First, grant access...
                <Typography sx={{ display: 'flex', textDecoration: 'underline', cursor: 'pointer' }}>
                  Check all <FiberManualRecordRounded sx={{ fontSize: '0.5rem', alignItems: 'center', height: 22 }} />
                  Check none
                </Typography>
              </Typography>
              <Typography variant="subtitle1" sx={{ pl: '4rem' }}>
                ...Then, choose
                <Typography sx={{ display: 'flex', textDecoration: 'underline', cursor: 'pointer' }}>
                  All on <FiberManualRecordRounded sx={{ fontSize: '0.5rem', alignItems: 'center', height: 22 }} />
                  All following
                </Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                p: '1rem',
                pt: 0,
                mt: 0,
                width: { xs: '90%', md: '55%' },
                display: { xs: 'none' },
                float: 'right',
              }}
            >
              <Divider />
            </Box>
          </Grid>

          {/* Members Information */}
          <Grid item xs={12} md={12} sx={{ mb: 1 }}>
            <Box
              sx={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 0,
              }}
            >
              <Typography
                sx={{ pl: { xs: '1rem', md: '5rem' }, fontWeight: 'bold', fontSize: { xs: '0.8rem', md: '1rem' } }}
                width="40%"
              >
                Title
                <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>Description</Typography>
              </Typography>
              <Checkbox size="small" sx={{ ml: { xs: 4, md: 0 } }} />
              <Select
                size="small"
                value={active}
                onChange={onChange}
                sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: '1px solid black', borderRadius: '2rem' },
                  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid black',
                    borderRadius: '2rem',
                  },
                  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid black',
                    borderRadius: '2rem',
                    fontSize: '10rem',
                  },
                  width: { xs: '70%', md: '18%' },
                  mb: 1,
                }}
              >
                {DATA.map((item) => (
                  <MenuItem key={item.Id} value={item.Id}>
                    {item.Value}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                ml: '5rem',
                width: '75%',
                pb: '2rem',
              }}
            >
              <Divider />
            </Box>
          </Grid>

          {/* Footer */}
          <Grid item xs={12} md={12} sx={{ mb: 2 }}>
            <Box
              sx={{
                marginX: 'auto',
                width: '75%',
                p: '1rem',
                display: { md: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid black',
                borderRadius: '2rem',
                textAlign: 'justify',
              }}
            >
              <Typography sx={{ width: { xs: '100%', md: '72%' } }}>
                <b>What heppens next?</b>
                <Typography>
                  We'll send each person a single email listing all the projects you've added them to. They will then be
                  able to see everything in those projects, start posting and interact with rest of the team. if they
                  have'nt signed into Butterneck before, they'll get instruction on how to join.
                </Typography>
              </Typography>
              <Button variant="contained" sx={{ display: 'flex', marginX: 'auto' }}>
                Save changes for 1 people
              </Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

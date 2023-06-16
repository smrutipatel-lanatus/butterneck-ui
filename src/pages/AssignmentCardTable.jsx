import React, { useState } from 'react';
import { Card, Divider, Grid, MenuItem, Select, Typography, TextField, Avatar, Chip, Button } from '@mui/material';
import { CardIcon } from '../assets/images/CardIcon';
import { RichTextbox } from '../common/input-components/RichTextbox';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';

const top100Films = [
  { title: 'John', year: 1994, chipValue: 'GG' },
  { title: 'Robort', year: 1972, chipValue: 'GG' },
  { title: 'smith', year: 1974, chipValue: 'GG' },
];

export const AssignmentCardTable = () => {
  const [status, setStatus] = React.useState('Triage');
  const [openRichTextBox, setOpenRichTextBox] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const setShowRichTextBox = () => {
    setOpenRichTextBox(true);
  };

  const getCapitalizedUserType = (userType) => {
    return userType.charAt(0).toUpperCase();
  };

  const styles = {
    style: {
      textAlign: 'right',
      mr: 3,
    },
  };
  return (
    <Card sx={{ mx: { sm: 10 }, mt: 5, py: 4 }}>
      <Grid container alignItems="center" ml={{ xs: 8, sm: 10, md: 20 }}>
        <Grid item mr={2}>
          <CardIcon width={34} height={30} />
        </Grid>
        <Grid item>
          <Typography variant="h5" fontWeight={550}>
            Integrate API
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, mx: { xs: 2, sm: 9, md: 15 } }} />
      <Grid container alignItems="center" mb={2}>
        <Grid item xs={3} sx={styles.style}>
          <Typography variant="subtitle1" fontWeight={700}>
            Column
          </Typography>
        </Grid>
        <Grid item container xs={8} alignItems="center">
          <Typography variant="subtitle1" fontWeight={700} mr={2}>
            {status}
          </Typography>
          <Grid item>
            <Select fullWidth size="small" borderRadius="2rem" value={status} onChange={handleChange}>
              <MenuItem value="Triage">Triage</MenuItem>
              <MenuItem value="Figuring it out">Figuring it out</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value={'Done'}>Done</MenuItem>
              <MenuItem value={'Not Now'}>Not Now</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mb={2}>
        <Grid item xs={3} sx={styles.style}>
          <Typography variant="subtitle1" fontWeight={700}>
            Added By
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Amit Monday at 2:15pm</Typography>
        </Grid>
      </Grid>

      <Grid container mb={2}>
        <Grid item xs={3} sx={styles.style}>
          <Typography variant="subtitle1" fontWeight={700}>
            Assigned to
          </Typography>
        </Grid>
        <Grid item container alignItems="center" xs={8} sm={7} md={4}>
          <Autocomplete
            popupIcon={false}
            multiple
            id="tags-standard"
            noOptionsText="User Not Found"
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <>
                <TextField {...params} variant="standard" />
              </>
            )}
            fullWidth
            open={Boolean(inputValue)}
            onInputChange={(e, value) => {
              setInputValue(value);
            }}
            renderTags={(value, getTagProps) => {
              return value.map((option, index) => (
                <>
                  <Chip
                    avatar={<Avatar>{getCapitalizedUserType(option)}</Avatar>}
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                </>
              ));
            }}
          />
        </Grid>
      </Grid>

      <Grid container mb={2}>
        <Grid item xs={3} sx={styles.style}>
          <Typography variant="subtitle1" fontWeight={700}>
            Due on
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Wed, May 24</Typography>
        </Grid>
      </Grid>

      <Grid container mb={2}>
        <Grid item xs={3} sx={styles.style}>
          <Typography variant="subtitle1" fontWeight={700}>
            Notes
          </Typography>
        </Grid>
        <Grid item>
          {!openRichTextBox ? (
            <Typography sx={{ cursor: 'pointer' }} onClick={setShowRichTextBox}>
              Describe Your Card Here...
            </Typography>
          ) : (
            <RichTextbox
              sx={{
                width: { xs: 350, md: 700 },
                height: { xs: 100, md: 200 },
                marginBottom: '5rem',
                ml: { xs: '1.5rem', sm: '1rem', lg: '0rem' },
              }}
            />
          )}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={4.5} sx={styles.style}>
          <Button variant="contained">Save changes</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Discard changes</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

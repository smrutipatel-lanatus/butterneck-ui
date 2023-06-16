import React from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { userChar } from '../../utils/constants';

const countries = [
  { name: 'Andorra' },
  { name: 'United Arab Emirates' },
  { name: 'Afghanistan' },
  { name: 'Antigua and Barbuda' },
];
const CommonListComponent = ({ text }) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="subtitle1"> • {text}</Typography>
      </Grid>
    </Grid>
  );
};

export const Administrators = () => {
  return (
    <Card sx={{ mx: { sm: 10 }, mt: 5 }}>
      <Grid container>
        <Grid item xs={12} my={1} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700}>
            Adminland
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
      </Grid>
      <Box sx={{ mx: { xs: 2, md: 12 } }}>
        <List style={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
          <Typography variant="subtitle1" mb={1}>
            It’s nice to have some trusted people available to help with administrative tasks on your Butterneck
            account. Here’s what Administrators can do:
          </Typography>
          <CommonListComponent text="Add or remove people from the account" />
          <CommonListComponent text="Change what people can access" />
          <CommonListComponent text="Move people between companies/organizations" />
          <CommonListComponent text="Rename a company/organization" />
          <CommonListComponent text="Add or remove other administrators" />
        </List>
        <Grid container>
          <Grid item>
            <Typography variant="subtitle1" fontWeight={700}>
              Administrators on this account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <List sx={{ width: '100%' }}>
            <ListItem secondaryAction={<Typography edge="end">Owner</Typography>}>
              <ListItemAvatar>
                <Avatar>ST </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Steve Joe" />
            </ListItem>
          </List>
          <Grid item xs={12} mb={2}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item my={0.5}>
            <Typography variant="subtitle1" fontWeight={700}>
              Who else should be an administrator?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              size="small"
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Avatar sx={{ mr: 2 }}>{userChar(option.name)}</Avatar>
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item my={2}>
            <Typography variant="subtitle2">
              Administrators must be part of Lnts . You can change someone’s company/organization in
              <Link to="/people-access"> Adminland</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Button variant="contained">Grant administrator power</Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

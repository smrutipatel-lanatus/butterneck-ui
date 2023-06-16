import { useTheme } from '@emotion/react';
import { BorderColor, DisabledByDefault, GroupAdd, Work } from '@mui/icons-material';
import { Avatar, Card, Divider, Grid, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  icon: {
    color: 'white',
    padding: 0.5,
    borderRadius: 1,
  },
};
const MuiListItem = ({ icon: Icon, listTitle, navigateTo }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <ListItem
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(navigateTo);
        }}
      >
        <ListItemIcon>
          <Icon sx={{ ...styles.icon, backgroundColor: theme.palette.primary.main }} />
        </ListItemIcon>

        <ListItemText sx={{ textTransform: 'none', textAlign: 'left' }}>{listTitle}</ListItemText>
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

const Adminland = () => {
  return (
    <>
      <Card sx={{ mx: { sm: 10 }, mt: 5 }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} my={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700}>
              Adminland
            </Typography>
          </Grid>
          <Grid item mb={2}>
            <Typography variant="subtitle2">Manage your Butterneck account</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container px={10} mb={4}>
          <Grid item my={2}>
            <Typography variant="h5" fontWeight={700}>
              Administrators
            </Typography>
          </Grid>
          <Grid item container alignItems="center">
            <Grid item mr={1}>
              <Avatar alt="" src="" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">John</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" mt="1rem">
            You're an admin, so you can...
          </Typography>
          <Grid item xs={12}>
            <MuiListItem
              icon={GroupAdd}
              listTitle="Add/Remove people or change their access"
              navigateTo="/people-access"
            />
          </Grid>
          <Grid item xs={12}>
            <MuiListItem icon={Work} listTitle="Add/Remove Administrators" navigateTo="/administrators" />
          </Grid>
          <Grid item xs={12}>
            <MuiListItem icon={BorderColor} listTitle="Rename this account" navigateTo="/rename-account" />
          </Grid>
          <Grid item xs={12}>
            <MuiListItem icon={DisabledByDefault} listTitle="Cancel this account" navigateTo="/cancellation/new" />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Adminland;

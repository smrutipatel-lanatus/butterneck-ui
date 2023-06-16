import { Button, Dialog, DialogContent, DialogContentText, Grid, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { MailIcon } from '../assets/images/MailIcon';
import TrueMark from '../assets/images/TrueMark';
import { Link, useLocation } from 'react-router-dom';

export const InviteViaEmail = () => {
  const [open, setOpen] = useState('inviteFirstTime');
  const theme = useTheme();
  const location = useLocation();
  const { inviteList } = location.state;
  return (
    <>
      <Dialog open={open === 'inviteFirstTime'} maxWidth="xs" onClose={() => setOpen('invitedAlready')}>
        <DialogContent>
          <Grid container justifyContent="center" sx={{ transform: 'rotate(-5deg)', paddingY: 3 }}>
            <MailIcon width={140} />
          </Grid>
          {inviteList.map((invite, index) => (
            <Grid key={index}>
              <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
                Invitation emailed to {invite.name}
              </Typography>
            </Grid>
          ))}
          <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
            They’ll get an email with instructions on how to sign in and join your Butterneck account. Add them to
            existing projects now or do that later.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={() => setOpen('invitedAlready')}>
                Set up which projects they can see
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={() => setOpen('invitedAlready')}>
                Not now, I'll do this later
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog open={open === 'invitedAlready'} maxWidth="xs" onClose={() => setOpen('')}>
        <DialogContent>
          <Grid container justifyContent="center" sx={{ transform: 'rotate(-5deg)', paddingY: 3 }}>
            <TrueMark width={130} />
          </Grid>
          <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
            butterneck has already been invited to this account.
          </Typography>
          <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
            They should’ve received an email with instructions to sign in and join your Butterneck account. Since you’re
            an admin, you can&nbsp;
            <Typography component="span" sx={{ color: theme.palette.primary.main }}>
              <Link>send them a link to log in.</Link>
            </Typography>
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={() => setOpen('')}>
                I'm Done
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

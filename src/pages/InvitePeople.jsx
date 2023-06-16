import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import InvitePeopleForm from '../components/InvitePeopleForm';
import { RichTextbox } from '../common/input-components/RichTextbox';
import { useNavigate } from 'react-router-dom';

export const InvitePeople = () => {
  const [inviteList, setInviteList] = useState([{ id: 0, name: '', email: '', jobTitle: '', company: '' }]);
  const [showRichTextBox, setShowRichTextBox] = useState();
  const handleAdd = (e) => {
    setInviteList([...inviteList, { id: inviteList.length + 1, name: '', email: '', jobTitle: '', company: '' }]);
  };

  const handleClose = (id) => {
    setInviteList(inviteList.filter((invite, index) => index !== id));
  };
  const handleNameChange = (event, index) => {
    // console.log(event.target.value);
    const updatedDataList = [...inviteList];
    updatedDataList[index].name = event.target.value;
    setInviteList(updatedDataList);
  };
  const handleSubmit = () => {
    const state = { inviteList };
    console.log('state', state);
    navigate('/invite-person', { state: { inviteList } });
    setInviteList([]);
  };
  const handleTextBox = () => {
    setShowRichTextBox(!showRichTextBox);
  };
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center', margin: '0 auto' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', padding: '1rem', textAlign: 'center' }}>
          Who are you inviting?
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', padding: '1rem', textAlign: 'center' }}>
          First you'll invite them to the account, Then you add them to the projects.
        </Typography>
      </Grid>

      {/* Invite People Form */}
      {inviteList.map((invite, index) => (
        <InvitePeopleForm
          id={index}
          key={invite.id}
          inviteName={invite.name}
          handleNameChange={(event) => handleNameChange(event, index)}
          onClose={inviteList.length > 1 && handleClose}
        />
      ))}

      <Grid item maxWidth="md" display="flex" justifyContent="center" mx="auto" mb="1rem">
        <Button
          variant="contained"
          sx={{
            margin: '0 auto',
          }}
          onClick={handleAdd}
        >
          Add more
        </Button>
      </Grid>

      {/* RichtextBox */}
      <Typography display="inline" sx={{ fontSize: '.9rem', textAlign: 'center', mb: '1rem' }}>
        <Button variant="outlined" onClick={handleTextBox}>
          Add a personal note to the invitation mail
        </Button>
      </Typography>
      {showRichTextBox ? (
        <RichTextbox
          sx={{
            width: { xs: 350, md: 700 },
            height: { xs: 100, md: 200 },
            marginBottom: '5rem',
            ml: { xs: '1.5rem' },
            mr: { xs: '0.5rem' },
          }}
        />
      ) : null}

      {/* Invite Button */}
      <Grid item maxWidth="md" display="flex" justifyContent="center" mx="auto" mb="1rem">
        <Button
          variant="contained"
          sx={{
            borderRadius: '20px',
          }}
          onClick={handleSubmit}
          // onClick={() => navigate('/invite-person')}
        >
          Email Invitation Now
        </Button>
      </Grid>
    </Grid>
  );
};

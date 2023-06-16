import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RedoIcon from '@mui/icons-material/Redo';

import { useState } from 'react';
import { userChar } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { AddPeopleToProjectDialog } from '../../project/AddPeopleToProjectDialog';

const userInfo = [
  { userName: 'Alan', emailAddress: 'alan@lanatussystems.com' },
  { userName: 'Alan Walker', emailAddress: 'alanwalker@lanatussystems.com' },
  { userName: 'Steve', emailAddress: 'steve@lanatussystems.com' },
  { userName: 'Carlos', emailAddress: 'carlos@lanatussystems.com' },
];
export const PeopleAccess = () => {
  const [value, setValue] = useState(userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openBox, setOpenBox] = useState(false);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterBySearch = (event) => {
    const value = event.target.value;

    let updatedList = [...userInfo];
    updatedList = updatedList.filter((item) => {
      return item.userName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    setValue(updatedList);
  };

  const navigateToInvitePeople = () => {
    navigate('/invite');
  };

  const navigateToEditInfo = () => {
    navigate('/edit-info');
  };

  const openInvitePeopleBox = () => {
    return setOpenBox(true);
  };

  return (
    <Card sx={{ mx: { sm: 10 }, mt: 5 }}>
      <AddPeopleToProjectDialog open={openBox} setOpen={setOpenBox} />

      <Grid container p={2}>
        <Grid item md={4} xs={12} mb={{ xs: 2, sm: 0 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={navigateToInvitePeople}>
            Invite someone now
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight={700}>
            Everyone on the account
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container px={{ xs: 2, md: 16 }}>
        <Grid item xs={12} my={2}>
          <TextField
            id="search_Field"
            variant="outlined"
            fullWidth
            size="small"
            onChange={filterBySearch}
            placeholder="Jump to a person..."
          />
        </Grid>
        <Grid item py={2}>
          <Typography variant="h6" fontWeight={700}>
            Lanatus
          </Typography>
        </Grid>
        {value.map((item, index) => {
          const { userName, emailAddress } = item;
          return (
            <Grid item container alignItems="center" justifyContent="space-between" key={index}>
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{userChar(userName)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userName} secondary={emailAddress} />
                  </ListItem>
                </List>
              </Grid>

              <IconButton onClick={handleClick}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 24,
                  horizontal: 30,
                }}
                transformOrigin={{
                  vertical: 'left ',
                  horizontal: 'right',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mx: 1,
                  }}
                >
                  <CancelOutlinedIcon onClick={handleClose} cursor="pointer" />
                </Box>

                <MenuItem onClick={navigateToEditInfo}>
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText>Edit info</ListItemText>
                </MenuItem>
                <MenuItem onClick={openInvitePeopleBox}>
                  <ListItemIcon>
                    <RedoIcon />
                  </ListItemIcon>
                  <ListItemText>Change access</ListItemText>
                </MenuItem>
              </Menu>
              <Divider width="100%" sx={{ mb: 1 }} />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

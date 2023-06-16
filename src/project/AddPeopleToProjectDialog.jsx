import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowImage from '../assets/images/red_arrow_up.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import { userChar } from '../utils/constants';

export function AddPeopleToProjectDialog({ open, onClose }) {
  const dataList = [
    { key: 0, name: 'John Doe', organization: 'Lanatus' },
    { key: 1, name: 'Jack Thomas', organization: 'lnts' },
    { key: 2, name: 'Mark Robbinson', organization: 'lntssystems' },
    { key: 3, name: 'Mark Robbinson', organization: 'lntssystems' },
    { key: 4, name: 'Mark Robbinson', organization: 'lntssystems' },
    { key: 5, name: 'Mark Robbinson', organization: 'lntssystems' },
    { key: 6, name: 'Mark Robbinson', organization: 'lntssystems' },
  ];
  const [listArray, setListArray] = useState(dataList);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const deleteItem = (index) => {
    setListArray((oldValues) => {
      return oldValues.filter((i) => i.key !== index);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container>
          <Grid item xs={12} sm={2} sx={{ mb: { xs: 2, sm: 0 } }}>
            <Button variant="contained" onClick={() => navigate('access/users/new')} startIcon={<AddIcon />}>
              Add People
            </Button>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h5" fontWeight={700} flex={1} textAlign="center" color="primary.title">
              People who can see this project
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
      </DialogTitle>
      {!isSm && (
        <Box
          p={2}
          mx={5}
          mb={2}
          sx={{
            position: 'relative',
            backgroundColor: 'box.mainBg',
            width: 250,
            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
          }}
        >
          <Box
            component="img"
            width={35}
            src={ArrowImage}
            position="absolute"
            top={0}
            left={0}
            sx={{ transform: 'translateY(-60%)' }}
          />
          <Typography variant="body1" textAlign="center" mb={1} fontWeight={600} color="toolTip.main">
            You are the only one here!
          </Typography>
          <Typography component="p" variant="body2" textAlign="center" color="toolTip.main">
            Hit the&nbsp;
          </Typography>
          <Typography component="span" variant="body2" fontWeight={600} color="toolTip.main">
            Add people&nbsp;
          </Typography>
        </Box>
      )}
      <DialogContent>
        {listArray.map((data) => {
          const { name, organization, key } = data;

          return (
            <>
              <Grid container justifyContent="space-between" px={2} alignItems="center" key={key}>
                <Grid item xs={12} sm={6} md={8}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: 'avatar.main' }}>{userChar(name)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={name} secondary={organization} />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item sx={{ mb: { xs: 1, sm: 0 } }}>
                  <Button variant="contained">Grant Access</Button>
                </Grid>
                <Grid item sx={{ mb: { xs: 1, sm: 0 } }}>
                  <Button variant="outlined" onClick={() => deleteItem(key)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1 }} />
            </>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Avatar, Box, Button, Card, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { CardIcon } from '../assets/images/CardIcon';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import IconButton from '@mui/material/IconButton/IconButton';
import { useNavigate } from 'react-router-dom/dist';

const assignmentDates = [
  {
    priorityStatus: 'IN PROGRESS IN BUTTERNECK',
    duration: 'Overdue',
    date: 'TUE, MAY 23',
    assigneeTask: 'Autumn',
    assigneeName: 'John',
    tooltipData: 'This is in progress',
  },
  {
    priorityStatus: 'TRIAGE IN BUTTERNECK',
    duration: 'Due Today',
    date: 'TUE, MAY 23',
    assigneeTask: 'Autumn',
    assigneeName: 'John',
    tooltipData: 'This is need to be done by today',
  },
  {
    priorityStatus: 'TRIAGE IN BUTTERNECK',
    duration: 'Due tomorrow',
    date: 'TUE, MAY 23',
    assigneeTask: 'Autumn',
    assigneeName: 'John',
    tooltipData: 'This is need to be done by tomorrow',
  },
  {
    priorityStatus: 'FIGURING IT OUT IN BUTTERNECK',
    duration: 'Due later this week',
    date: 'TUE, MAY 23',
    assigneeTask: 'Autumn',
    assigneeName: 'John',
    tooltipData: 'This is need to be done by this week',
  },
  {
    priorityStatus: 'TRIAGE IN BUTTERNECK',
    duration: 'Due next week',
    date: 'TUE, MAY 23',
    assigneeTask: 'Autumn',
    assigneeName: 'John',
    tooltipData: 'This is need to be done by this next week',
  },
  {
    priorityStatus: 'TRIAGE IN BUTTERNECK',
    duration: 'Due later',
    date: 'TUE, MAY 23',
    assigneeTask: 'Autumn',
    assigneeName: 'John',
    tooltipData: 'This is need to be done by later',
  },
];
export const Assignments = () => {
  const [changeButtonStatus, setChangeButtonStatus] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const toggleStatus = () => {
    setChangeButtonStatus(!changeButtonStatus);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index } = props;
    return (
      <Box>
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Card sx={{ mx: { sm: 10 }, mt: 5 }}>
      <Grid container justifyContent="flex-end" mb={2} p={3}>
        <Grid item>
          <Button variant="outlined" startIcon={!changeButtonStatus ? <CheckIcon /> : ''} onClick={toggleStatus}>
            {changeButtonStatus ? 'Email me this every Monday morning' : 'Emailing my assignments every Monday'}
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Avatar sx={{ width: 56, height: 56 }}>AA</Avatar>
        </Grid>
        <Grid item container justifyContent="center" my={1}>
          <Typography variant="h4" fontWeight={700}>
            Here are your assignments
          </Typography>
        </Grid>
      </Grid>

      <Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="My assignments with dates" />
        </Tabs>

        {/* panel1 start*/}

        <TabPanel value={value} index={0} px={{ xs: 2, sm: 9, md: 15 }}>
          <Box sx={{ p: 4, px: { xs: 2, sm: 9, md: 15 } }}>
            {assignmentDates.map(({ date, assigneeName, assigneeTask, duration, priorityStatus, tooltipData }) => {
              return (
                <>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {duration}
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Grid container mb={2}>
                    <Grid item xs={5}>
                      <Typography variant="subtitle2">{date}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {priorityStatus}
                      </Typography>
                      <Grid item container alignItems="center" pl={2}>
                        <Grid item>
                          <Button startIcon={<CardIcon />} onClick={() => navigate('/assignments-card-table')}>
                            <Typography variant="body2">{assigneeTask}</Typography>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Tooltip title={tooltipData}>
                            <IconButton>
                              <TextSnippetIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Button startIcon={<Avatar sx={{ width: 28, height: 24, mr: 1 }} />}>
                            <Typography variant="body2">{assigneeName}</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
        </TabPanel>
        {/* panel1  end*/}
      </Box>
    </Card>
  );
};

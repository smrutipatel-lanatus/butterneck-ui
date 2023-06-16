import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import events from '../assets/mockData/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/system';
import { Divider, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

export const Schedule = () => {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  const handleRegisteredEventClick = (event) => {
    console.log({ event });
  };

  return (
    <>
      <Grid container>
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
              Schedule
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 0, p: 0 }}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              p: '1rem',
              pt: '3rem',
            }}
          >
            <Calendar
              views={['day', 'agenda', 'work_week', 'month']}
              selectable
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={eventsData}
              style={{ height: '70vh' }}
              onSelectEvent={(event) => {
                handleRegisteredEventClick(event);
                alert(event.title);
              }}
              onSelectSlot={handleSelect}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

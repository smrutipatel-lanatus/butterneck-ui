import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import events from '../assets/mockData/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

export const Roster = () => {
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
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              p: '1rem',
              pt: '3rem',
            }}
          >
            <Calendar
              views={['work_week']}
              selectable
              localizer={localizer}
              defaultDate={new Date()}
              events={eventsData}
              defaultView="work_week"
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

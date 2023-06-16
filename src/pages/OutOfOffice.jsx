import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { DateInput } from '../common/input-components/DateInput';
import out from '../assets/images/out.png';
import { Toggle } from '../common/ToggleButton';

const styles = {
  datePicker: {
    width: '100%',
  },
};

export const OutOfOffice = () => {
  const [isScheduling, setIsScheduling] = useState(false);

  const theme = useTheme();
  const { textColor } = theme.palette.chip;

  return (
    <Card
      sx={{
        width: { xs: '85%', md: '30%' },
        height: '100%',
        borderRadius: '2rem',
        margin: '1rem auto',
        padding: { xs: '1rem', md: '2rem' },
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Out of Office?
        </Typography>
        <Typography variant="subtitle1">Heading out on holiday? Taking a few days off?</Typography>
        <Typography variant="subtitle1" marginTop={0}>
          Let your colleagues know you’re out.
        </Typography>
      </CardContent>

      <Card
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '2rem',
          backgroundColor: theme.palette.primary.medium,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: textColor,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundImage: { out },
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '1rem',
            }}
          >
            <Box sx={{ position: 'absolute' }}>
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginBottom: '1rem',
                }}
              />
            </Box>
            {isScheduling && (
              <Box sx={{ position: 'relative' }}>
                <img
                  src={out}
                  alt="Avatar"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                  }}
                />
              </Box>
            )}
          </Box>
          <Typography variant="h5" fontWeight="bold">
            Amit
          </Typography>

          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Associate Project Manager at Lanatus Systems
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" padding={2}>
            <Typography>I'm in</Typography>
            {<Toggle sx={{ m: 1 }} checked={isScheduling} onClick={() => setIsScheduling((prev) => !prev)} />}
            <Typography>I'm out</Typography>
          </Stack>

          {/* Below part */}
          {isScheduling && (
            <>
              <Divider sx={{ width: '100%' }} color={textColor} />
              <Typography variant="h5" color={textColor} marginTop={2} fontWeight="bold" sx={{ textAlign: 'center' }}>
                I'll be Out of Office...
              </Typography>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                gap={1}
                display="flex"
                justifyContent="space-between"
                alignItems={{ xs: 'center', md: 'flex-end' }}
                padding={2}
                width={'100%'}
              >
                <DateInput
                  color={theme.palette.primary.contrastText}
                  name="startDate"
                  label="Start date"
                  placeholder="Start Date"
                  sx={styles.datePicker}
                />
                <Typography variant="body1">to</Typography>
                <DateInput
                  name="endDate"
                  color={theme.palette.primary.contrastText}
                  label="End date"
                  placeholder="End Date"
                  sx={styles.datePicker}
                />
              </Stack>
              <Button variant="contained" fullWidth sx={{ background: theme.palette.success.light }}>
                Save
              </Button>
              <Typography
                variant="subtitle2"
                color={textColor}
                marginY={2}
                lineHeight={1.3}
                textAlign="center"
                gutterBottom
                paddingX={4}
              >
                Note: It may take up to 30min for your avatar to update everywhere.
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Card>
  );
};

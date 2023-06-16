import { useTheme } from '@emotion/react';
import { Box, TextField, Typography } from '@mui/material';

export function DateInput({ color, name, label, titleProps, sx }) {
  const theme = useTheme();
  return (
    <Box sx={{ ...sx }}>
      {label ? (
        <Typography variant="body1" fontWeight="bold" mb={0.5} {...titleProps}>
          {label}
        </Typography>
      ) : null}
      <TextField
        type="date"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: color,
            },
            '&:hover fieldset': {
              borderColor: color,
            },
            '&.Mui-focused fieldset': {
              borderColor: color,
            },
            color,
          },
          '& svg': {
            color,
          },
          ...sx,
        }}
        fullWidth
        name={name}
        inputProps={{
          sx: {
            '::-webkit-calendar-picker-indicator': {
              filter: color == theme.palette.primary.contrastText && 'invert(1)',
            },
          },
        }}
      />
    </Box>
  );
}

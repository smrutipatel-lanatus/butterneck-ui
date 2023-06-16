import { CircularProgress, Typography } from '@mui/material';

export function ComponentLoading({ width = 20, color = 'white', loadingText = '' }) {
  return loadingText ? (
    <Typography>{loadingText}</Typography>
  ) : (
    <CircularProgress size={width} sx={{ color, p: 0.2 }} />
  );
}

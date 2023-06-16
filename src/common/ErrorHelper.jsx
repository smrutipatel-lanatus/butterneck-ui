import { Typography, useTheme } from '@mui/material';
import ErrorSharpIcon from '@mui/icons-material/ErrorSharp';

const ErrorHelper = ({ message }) => {
  const theme = useTheme();
  return (
    <Typography
      mt={0.8}
      variant="subtitle1"
      sx={{
        color: theme.palette.primary.error,
        display: 'flex',
        alignItems: 'start',
      }}
    >
      {/* common Error message component for input and select field */}
      <ErrorSharpIcon sx={{ display: 'flex', alignSelf: 'center', mr: 1 }} fontSize="small" />
      {message}
    </Typography>
  );
};

export default ErrorHelper;

import { createTheme, responsiveFontSizes } from '@mui/material';
import palette from './palette';

const getTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: palette(mode),
      layout: {
        contentWidth: 1236,
      },

      // Custom Styles For Mui Components

      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: '20px',
            },
          },
        },
      },
    })
  );

export default getTheme;

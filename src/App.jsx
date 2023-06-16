import { Box, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import '../src/styles/app.css';
import { AppContent } from './components/layout/AppContent';
import getTheme from './theme';

const queryClient = new QueryClient();
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

function App() {
  const theme = getTheme('light', 'black');

  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;

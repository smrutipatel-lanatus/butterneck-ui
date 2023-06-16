import { CircularProgress, Dialog } from '@mui/material';

export function PageLoading() {
  return (
    <Dialog
      open
      fullScreen
      PaperProps={{
        sx: {
          background: 'transparent',
        },
      }}
    >
      <CircularProgress sx={{ margin: 'auto', color: 'primary.main' }} />
    </Dialog>
  );
}

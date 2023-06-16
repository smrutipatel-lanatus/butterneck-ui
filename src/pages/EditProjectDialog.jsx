import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProjectDialogCustom } from '../common/ProjectDialogCustom';

export const EditProjectDialog = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const [open, setOpen] = useState(true);

  const closeDialog = () => {
    setOpen(false);
  };

  const formSubmit = () => {
    console.log('saved');
  };

  return (
    <FormProvider {...methods}>
      <form onsubmit={handleSubmit(formSubmit)}>
        <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
          <DialogContent>
            <Box sx={{ overflowX: 'hidden' }}>
              <ProjectDialogCustom open={open} />
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'start', p: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </FormProvider>
  );
};

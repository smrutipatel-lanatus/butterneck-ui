import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const NewLaneForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const onSubmit = () => {
    if (formData.length > 1) {
      props.onAdd(formData);
    } else {
      toast.error('Please enter title');
    }
  };
  return (
    <Box
      sx={{
        width: '200px',
        py: 1,
      }}
    >
      <Typography mb={1}>Add TaskStage Form</Typography>
      <TextField label="Title" name="name" size="small" sx={{}} onChange={(e) => setFormData(e.target.value)} />
      <Box>
        <Button variant="contained" sx={{ mt: 1, width: '50%', borderRadius: 1 }} onClick={onSubmit}>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 1, width: '50%', borderRadius: 1 }}
          onClick={props.onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

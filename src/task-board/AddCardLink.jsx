import { IconButton } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const AddCardLink = (props) => {
  return (
    <IconButton
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        ':hover': {
          backgroundColor: 'primary.dark',
        },
      }}
      onClick={props.onClick}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddCardLink;

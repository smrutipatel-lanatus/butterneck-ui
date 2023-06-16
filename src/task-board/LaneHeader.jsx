import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { toast } from 'react-toastify';
import useMutationApi from '../hooks/useMutationApi';
import Modal from '@mui/material/Modal';
import { TextInput } from '../common/TextInput';

export const LaneHeader = (props) => {
  const { mutateAsync: deleteTaskStage } = useMutationApi({
    method: 'delete',
    endpoint: `/task-stage/${props.id}`,
  });

  const deleteStage = async () => {
    if (props.cards.length) {
      toast.error('First you need to delete or change the position of all tasks in this stage');
      return;
    } else {
      await deleteTaskStage();
      props.onDelete(props.id);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {props.title}
      </Typography>
      <StageOptionsMenu deleteStage={deleteStage} name={props.title} {...props} />
    </Box>
  );
};

export const StageOptionsMenu = (props) => {
  const { deleteStage } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = () => setOpenDialog(true);

  return (
    <div>
      <MoreVertIcon
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            deleteStage();
          }}
        >
          Delete stage
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenDialog();
          }}
        >
          Edit stage
        </MenuItem>
      </Menu>
      <EditStageModal open={openDialog} handleClose={handleCloseDialog} {...props} />
    </div>
  );
};

export const EditStageModal = ({ open, handleClose, name, id, updateTitle }) => {
  const [stage, setStage] = useState(name);

  const { mutateAsync: updateTaskStage } = useMutationApi({
    method: 'patch',
    endpoint: `/task-stage/${id}`,
  });

  const onSubmit = async () => {
    await updateTaskStage({ name: stage });
    updateTitle(stage);
    handleClose();
    toast.success('Updated Successfully');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
        }}
      >
        <TextInput title="Stage Name" name="stage" onChange={(e) => setStage(e.target.value)} />
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

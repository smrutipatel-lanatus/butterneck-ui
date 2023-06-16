import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Button, Divider, Grid, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { Add, Download, Folder, Upload, Link } from '@mui/icons-material';

export const Docs = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          md={12}
          sx={{
            p: '1rem',
          }}
        >
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'left' } }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: '20px',
              }}
              onClick={handleClick}
            >
              New ...
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Docs & Files
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              sx={{
                borderRadius: '20px',
              }}
            >
              Download this folder
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 0, p: 0 }}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              p: '1rem',
              pt: '3rem',
            }}
          >
            <Typography>Files</Typography>
          </Box>
        </Grid>
      </Grid>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText>Make a new folder</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Upload />
          </ListItemIcon>
          <ListItemText>Upload files</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Link />
          </ListItemIcon>
          <ListItemText>Link to an external service</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

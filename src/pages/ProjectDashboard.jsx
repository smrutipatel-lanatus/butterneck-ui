import { Avatar, Button, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardTableBg from '../assets/images/CardTableBg';
import DocumentBg from '../assets/images/DocumentBg';
import EventBg from '../assets/images/EventBg';
import { FeatureCard } from '../components/FeatureCard';
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { Box } from '@mui/system';
import { PageLoading } from '../components/PageLoading';
import useFetchApi from '../hooks/useFetchApi';
import { AddPeopleToProjectDialog } from '../project/AddPeopleToProjectDialog';

const editMenu = [
  { name: 'Edit project details', icon: <Edit />, navigateTo: '/edit-project' },
  { name: 'Delete', icon: <Delete /> },
];

export const ProjectDashboard = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };
  const { projectId } = useParams();

  const { data: projectData } = useFetchApi({
    endpoint: `/project/${projectId}`,
  });

  return projectData ? (
    <Grid
      container
      p={0}
      m={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        width: '100%',
      }}
    >
      <Grid
        item
        container
        xs={11.5}
        md={11.5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #d0d0d0',
          borderRadius: '2rem',
          mt: '1rem',
          mb: '1rem',
        }}
      >
        {/* Upper */}
        <Grid item container xs={12} sx={{ flexDirection: 'column', alignItems: 'center', mt: '1rem' }}>
          {/* Date */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              width: '95%',
            }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenMenu} sx={{ p: 0, border: '1px solid black' }}>
                <MoreHoriz />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseMenu}
              >
                {editMenu?.map(({ name, icon, navigateTo }) => (
                  <MenuItem key={name} onClick={handleCloseMenu}>
                    <Button key={name} startIcon={icon} onClick={() => navigate(navigateTo)}>
                      {name}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>

          <AddPeopleToProjectDialog open={open} onClose={() => setOpen(false)} />
          {/* Name & Description */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '0.5rem' }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {projectData.name}
            </Typography>
            <Typography variant="body2">{projectData.description}</Typography>
          </Grid>

          {/* Add Some People */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} gap={1}>
            <Button
              variant="contained"
              sx={{
                color: '#fff',
                display: 'flex',
                borderRadius: '20px',
                ':hover': {
                  backgroundColor: '#000',
                  color: 'white',
                },
              }}
              onClick={() => setOpen(true)}
            >
              Add Some People
            </Button>{' '}
            <Avatar>MK</Avatar>
          </Grid>
        </Grid>

        {/* Lower */}
        <Grid item container md={8} spacing={1} my="2rem">
          <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="stretch">
            <FeatureCard
              svg={DocumentBg}
              description="Share docs, files, images, spreadsheets. Organize in folder so they're easy to find."
              title="Docs & Files"
              onClick={() => {
                navigate(`/project/${projectId}/docs-and-files`);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="stretch">
            <FeatureCard
              title="Schedule"
              description="Set important dates on a shared schedule. Subscribe to events in Google Cal, iCal, or Outlook."
              svg={EventBg}
              onClick={() => {
                navigate(`/project/${projectId}/schedule`);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="stretch">
            <FeatureCard
              title="Task Board"
              description="A visual, Kanban-like tool for process-oriented work. Establish a work flow and move cards across
            columns."
              svg={CardTableBg}
              onClick={() => {
                navigate(`/project/${projectId}/task-board`);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <PageLoading />
  );
};

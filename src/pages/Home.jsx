import React, { useState } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { HomeLogoBox } from '../components/HomeLogoBox';
import { CreateProjectDialog } from '../project/CreateProjectDialog';
import PushPinIcon from '../assets/images/PushPinIcon';
import { useNavigate } from 'react-router-dom';
import useFetchApi from '../hooks/useFetchApi';
import { PageLoading } from '../components/PageLoading';

export function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const { data: projectData, isFetching } = useFetchApi({
    endpoint: `/user/project/all`,
  });

  return (
    <>
      <Grid container justifyContent="center" my={2}>
        <CreateProjectDialog open={open} onClose={() => setOpen(false)} />
        <Grid container sx={{ position: 'relative' }}>
          <Button
            startIcon={<AdminPanelSettings />}
            sx={{
              position: 'absolute',
              right: 0,
            }}
            onClick={() => navigate('/account')}
          >
            Adminland
          </Button>
          <HomeLogoBox />
          <Grid container item sm={12} justifyContent="center" mt={2}>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 1 }}>
              <Typography>Make a new project</Typography>
            </Button>
            <Button variant="contained" onClick={() => navigate('/invite')}>
              Invite People
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {isFetching ? (
        <PageLoading />
      ) : (
        <Grid container justifyContent="center" px={4} spacing={4} mb={6}>
          {projectData?.length > 0 ? (
            projectData?.map((project) => {
              return (
                <Grid key={project?.id} item>
                  <Card
                    sx={{ width: 300, m: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                      navigate(`/project/${project?.id}`);
                    }}
                  >
                    <CardContent>
                      <Grid container>
                        <Grid item container alignItems="center" justifyContent="space-between">
                          <Typography variant="subtitle1" fontWeight={700} color="black">
                            {project?.name}
                          </Typography>
                          <PushPinIcon />
                        </Grid>

                        <Grid item>
                          <Typography variant="subtitle1">{project?.description}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>

                    <CardActions sx={{ marginTop: 'auto' }}>
                      {project?.userProject?.map((user) => {
                        return (
                          <Avatar
                            key={user?.User?.id}
                            sx={{
                              width: 24,
                              height: 24,
                              p: 0.5,
                              background: theme.palette.chip.chipBg,
                              color: theme.palette.chip.textColor,
                            }}
                          >
                            {user?.User?.name?.charAt(0).toUpperCase()}
                          </Avatar>
                        );
                      })}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Typography variant="h5" fontWeight={700} mt="2rem" textAlign="center" color="primary.title">
              You don't have any projects yet
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
}

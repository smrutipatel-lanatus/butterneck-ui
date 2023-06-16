import { Avatar, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { MessageIcon } from '../assets/images/MessageIcon';
import { AddPeopleToProjectDialog } from '../project/AddPeopleToProjectDialog';
import { FeatureCard } from '../components/FeatureCard';
import useMutationApi from '../hooks/useMutationApi';
import { useParams } from 'react-router-dom';
import { PageLoading } from '../components/PageLoading';

export function ProjectDetail() {
  const [open, setOpen] = useState(false);

  const { projectId } = useParams();

  const { mutateAsync: getProjectData, data: projectData } = useMutationApi({
    endpoint: `/project/${projectId}`,
    method: 'GET',
  });

  useEffect(() => {
    getProjectData();
  }, [getProjectData]);

  return projectData ? (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Card variant="outlined" sx={{ width: '100%', maxWidth: 800 }}>
        <AddPeopleToProjectDialog open={open} onClose={() => setOpen(false)} />

        <CardContent>
          <Box component="section">
            <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>
              {projectData.name}
            </Typography>
            <Typography variant="h6" textAlign="center" mb={1}>
              {projectData.description}
            </Typography>
            <Grid container alignItems="center" justifyContent="center" columnGap={2} mb={4}>
              <Chip
                variant="outlined"
                label="Add some people"
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
              />
              <Avatar>P</Avatar>
            </Grid>
            <Grid container spacing={1}>
              <Grid item sm={4}>
                <FeatureCard
                  title="Schedule"
                  description="Post announcements, pitch ideas, progress updates, etc. and keep feedback on-topic"
                  svg={MessageIcon}
                />
              </Grid>
              <Grid item sm={4}>
                <FeatureCard
                  title="Card Table"
                  description="Post announcements, pitch ideas, progress updates, etc. and keep feedback on-topic"
                  svg={MessageIcon}
                />
              </Grid>
              <Grid item sm={4}>
                <FeatureCard
                  title="Docs and Files"
                  description="Post announcements, pitch ideas, progress updates, etc. and keep feedback on-topic"
                  svg={MessageIcon}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <PageLoading />
  );
}

import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormAutocompleteField } from '../common/input-components/FormAutocompleteField';
import { FormRichTextField } from '../common/input-components/FormRichTextField';
import useFetchApi from '../hooks/useFetchApi';
import useMutationApi from '../hooks/useMutationApi';
import { useAuthContext } from '../context/AuthContextProvider';

export function ProjectAccess() {
  const methods = useForm();
  const { handleSubmit, getValues } = methods;

  const { projectId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { orgId } = user;

  const { data: userList } = useFetchApi({
    endpoint: `/user?orgId=${orgId}`,
  });

  const { mutateAsync: addPeopleToProject } = useMutationApi({
    endpoint: `/user/project/${projectId}`,
  });

  const userOptions = useMemo(() => {
    if (userList?.length) {
      return userList.map(({ name, id }) => ({ label: name, value: id }));
    }
    return [];
  }, [userList]);

  const addPeople = () => {
    const formData = getValues();
    addPeopleToProject(formData).then((res) => {
      const { SUCCESS } = res.data;
      if (SUCCESS) {
        toast.success('Users added to project');
        navigate(`/project/${projectId}`);
      }
    });
  };

  return (
    <Box
      component="section"
      sx={{ m: 'auto', p: 1, width: '100%', maxWidth: 'sm', boxSizing: 'border-box', borderRadius: '0.5rem' }}
    >
      <FormProvider {...methods}>
        <Grid p={3} alignContent="center" minHeight="100vh" m="auto">
          <Card variant="outlined">
            <CardContent>
              <Box mb={2}>
                <FormAutocompleteField
                  label="Who do you want to add to this project?"
                  placeholder="Type their names here..."
                  options={userOptions}
                  name="userId"
                  required
                  noOptionsText={
                    <Typography>
                      Nothing here. Make sure you <Link to="/invite">added them to your account.</Link>
                    </Typography>
                  }
                  sx={{ mb: 0 }}
                />
              </Box>
              <FormRichTextField
                label="Add an optional note to the invitation email"
                name="note"
                editorStyles={{ height: 100 }}
              />
            </CardContent>
          </Card>
          <Typography variant="body2" textAlign="center" m="auto" mt={2} maxWidth="sm">
            <Typography component="span" variant="body2" fontWeight={600}>
              What happens next?
            </Typography>
            Everyone above will be immediately added to the project and receive an email with instructions to join.
            They'll be able to see everything posted so far.
          </Typography>
          <Grid container justifyContent="center" mt={2}>
            <Button variant="contained" sx={{ m: 'auto' }} onClick={handleSubmit(addPeople)}>
              Add them to project
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}

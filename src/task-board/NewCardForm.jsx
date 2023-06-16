import { Button, Dialog, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelectField } from '../common/input-components/FormSelectField';
import { useLocation } from 'react-router-dom';
import useFetchApi from '../hooks/useFetchApi';
import { FormInputField } from '../common/input-components/FormInputField';
import { DateInput } from '../common/input-components/DateInput';

export const NewCardForm = (props) => {
  const [open, setOpen] = useState(true);
  const methods = useForm({ defaultValues: { priority: 'Medium' } });
  const { handleSubmit, setValue } = methods;

  const closeDialog = () => {
    setOpen(false);
    props.onCancel();
  };

  const location = useLocation();
  const projectId = Number(location?.pathname?.split('/')[2]);

  const { data: userData } = useFetchApi({
    endpoint: `/user?project=${projectId}`,
  });

  const priorityArray = [
    { name: 'High', value: 'High' },
    { name: 'Medium', value: 'Medium' },
    { name: 'Low', value: 'Low' },
  ];

  const onSubmit = (data) => {
    props.onAdd({
      ...data,
      dueDate: data?.dueDate ? new Date(data.dueDate).toISOString() : null,
      taskStageId: props.laneId,
    });
  };

  const handle = (event) => {
    setValue('priority', event.target.value);
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container p={4}>
            <Typography variant="h5" mb={2} fontWeight={700} textAlign="center" width={'100%'}>
              Create new task
            </Typography>
            <Grid item xs={12}>
              <FormInputField label="Title" name="title" size="small" required />
            </Grid>
            <Grid item xs={12}>
              <FormInputField
                label="Description (optional)"
                name="description"
                inputProps={{ multiline: true, rows: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <DateInput type={'date'} label={'Due Date (optional)'} name="dueDate" disablePast />
            </Grid>

            <Grid item xs={12}>
              <FormSelectField label={'Priority'} name="priority" options={priorityArray} onChange={handle} />
            </Grid>
            <Grid item xs={12}>
              <FormSelectField
                label={'Assign (optional)'}
                name="assigneeId"
                options={userData?.map((user) => {
                  return {
                    name: user.name,
                    value: user.id,
                    ...user,
                  };
                })}
              />
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid xs={5.5}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid>
              <Grid xs={5.5}>
                <Button variant="outlined" fullWidth onClick={closeDialog}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Dialog>
  );
};

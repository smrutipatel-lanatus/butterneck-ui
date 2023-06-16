import { Button, Dialog, Grid, Typography } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputField } from '../common/input-components/FormInputField';
import { FormSelectField } from '../common/input-components/FormSelectField';
import useMutationApi from '../hooks/useMutationApi';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import useFetchApi from '../hooks/useFetchApi';
import dayjs from 'dayjs';

export const UpdateCardFormPopUp = ({ open, setOpen, data: cardData, setData, ...props }) => {
  const { title, dueDate, priority, description, assignedTo, id, assigneeId } = props;
  const location = useLocation();
  const projectId = Number(location?.pathname?.split('/')[2]);
  const priorityArray = [
    { name: 'High', value: 'High' },
    { name: 'Medium', value: 'Medium' },
    { name: 'Low', value: 'Low' },
  ];

  const { data: userData } = useFetchApi({
    endpoint: `/user?project=${projectId}`,
  });
  const { mutateAsync: updateTask } = useMutationApi({
    method: 'put',
    endpoint: `/task/${id}`,
  });

  const methods = useForm({
    defaultValues: {
      title,
      priority,
      assigneeId: assigneeId || userData?.find(({ name }) => name === assignedTo)?.id,
      dueDate: dueDate && dayjs(dueDate).format('YYYY-MM-DD'),
      description,
    },
  });
  const { handleSubmit } = methods;

  const closeDialog = () => {
    setOpen(false);
  };

  const usersInMyProject = userData?.map((user) => {
    return {
      name: user.name,
      value: user.id,
      ...user,
    };
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        dueDate: data?.dueDate && new Date(data?.dueDate).toISOString(),
        taskStageId: props?.laneId,
      };
      //! to update data in database
      const res = await updateTask(payload);
      //! to update data on card
      setData({
        ...cardData,
        title: res.data.data.title,
        description: res.data.data.description,
        priority: res.data.data.priority,
        dueDate: res?.data?.data?.dueDate,
        assigneeId: res.data.data.assigneeId,
        assignedTo: res.data.data.assignedTo?.name,
      });
      //! to update data on previous dataset
      props.onChange({
        ...cardData,
        title: res.data.data.title,
        description: res.data.data.description,
        priority: res.data.data.priority,
        dueDate: res.data.data.dueDate,
        assigneeId: res.data.data.assigneeId,
        assignedTo: res.data.data.assignedTo?.name,
      });
      toast.success('Task updated successfully');
      closeDialog();
    } catch (e) {
      console.log({ e });
      toast.error('Something went wrong');
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container p={4}>
            <Typography variant="h5" mb={2} fontWeight={700} textAlign="center" width={'100%'}>
              Update task
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
              <FormInputField type={'date'} label={'Due Date (optional)'} name="dueDate" />
            </Grid>

            <Grid item xs={12}>
              <FormSelectField label={'Priority'} name="priority" options={priorityArray} />
            </Grid>
            <Grid item xs={12}>
              <FormSelectField label={'Assign (optional)'} name="assigneeId" options={usersInMyProject} />
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

import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import useMutationApi from '../hooks/useMutationApi';
import { ComponentLoading } from '../components/ComponentLoading';
import { toast } from 'react-toastify';
import { ProjectDialogCustom } from '../common/ProjectDialogCustom';

export function CreateProjectDialog({ open, onClose }) {
  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit, getValues } = methods;

  const { mutateAsync: createProject, isLoading } = useMutationApi({
    endpoint: '/project',
  });

  function formSubmit() {
    createProject(getValues()).then((res) => {
      const {
        SUCCESS,
        data: { id },
      } = res.data;
      if (SUCCESS) {
        onClose(false);
        toast.success('Project created successfully');
        navigate(`/project/${id}`);
      }
    });
  }

  return (
    <FormProvider {...methods}>
      <form>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogContent>
            <Box sx={{ overflowX: 'hidden' }}>
              <ProjectDialogCustom open={open} />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'start', p: 3 }}>
            <Button variant="contained" sx={{ mr: 2 }} disabled={isLoading} onClick={handleSubmit(formSubmit)}>
              {isLoading ? <ComponentLoading loadingText="Creating..." /> : 'Create this project'}
            </Button>
            <Button variant="outlined" onClick={() => onClose(false)}>
              Never mind
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </FormProvider>
  );
}

import { Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

const CommonFormProvider = ({ children }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((e) => {
          console.log('form submitted');
        })}
      >
        {children}
        <Button variant="contained" sx={{ mt: 2 }} type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
export default CommonFormProvider;

import { Avatar, Button, Card, Divider, Grid, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMutationApi from '../hooks/useMutationApi';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputField } from '../common/input-components/FormInputField';
import { toast } from 'react-toastify';

const styles = {
  card: {
    width: 400,
    maxWidth: 400,
    p: 3,
    margin: 'auto',
  },
  button: {
    textTransform: 'unset',
    borderRadius: '4px',
    m: 'auto',
    my: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    mb: 1,
  },
};

export function UserSignup() {
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
  const methods = useForm();
  const { handleSubmit } = methods;

  const { token } = useParams();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { mutateAsync: signup } = useMutationApi({
    endpoint: '/invitation/claim',
  });

  const onSubmit = (values) => {
    const { USER_SIGNUP_NAME, USER_SIGNUP_EMAIL, USER_SIGNUP_PASSWORD, USER_SIGNUP_CONFIRM_PASSWORD } = values;
    const payload = {
      name: USER_SIGNUP_NAME,
      email: USER_SIGNUP_EMAIL,
      password: USER_SIGNUP_PASSWORD,
      confirmPassword: USER_SIGNUP_CONFIRM_PASSWORD,
      token,
    };

    if (payload.password !== payload.confirmPassword) {
      toast.error('Password does not match');
      return;
    }
    delete payload.confirmPassword;
    signup(payload).then((res) => {
      const { SUCCESS } = res.data;
      if (SUCCESS) {
        toast.success('Successful invitation');
        navigate('/');
      }
    });
  };

  const handleLogoChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected image in state
  };

  const handleRemoveButtonClick = () => {
    setSelectedImage(null); // Reset the selected image when remove button is clicked
  };

  const handlePhotoButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input when add your photo button is clicked
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <Grid container my={2}>
      <Card variant="outlined" sx={styles.card}>
        <Typography variant="h6" fontWeight={700} mb={2} textAlign="center">
          Join on Butterneck
        </Typography>

        <Avatar
          src={selectedImage ? URL.createObjectURL(selectedImage) : null}
          sx={{ width: 150, height: 150, margin: 'auto', border: '1px solid gray' }}
        />

        {!selectedImage && (
          <Button variant="contained" sx={{ ...styles.button }} onClick={handlePhotoButtonClick}>
            Add your photo...
          </Button>
        )}

        {selectedImage && (
          <Button variant="contained" color={'error'} sx={{ ...styles.button }} onClick={handleRemoveButtonClick}>
            Remove
          </Button>
        )}

        <input
          type="file"
          id="fileInput"
          name="profileImage"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleLogoChange}
        />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputField label="Name" name="USER_SIGNUP_NAME" required />

            <FormInputField label="Email" name="USER_SIGNUP_EMAIL" type={'email'} required />

            <FormInputField label="Password" name="USER_SIGNUP_PASSWORD" type="password" required />

            <FormInputField label="Confirm Password" name="USER_SIGNUP_CONFIRM_PASSWORD" type="password" required />

            <Button type="submit" variant="contained" fullWidth sx={{ ...styles.button }}>
              OK, Let's Go!
            </Button>
          </form>
        </FormProvider>

        <Divider sx={{ my: 1, mt: 2 }}>
          <Typography variant="subtitle2">Or, if you’ve used Butterneck before</Typography>
        </Divider>

        <Button variant="contained" fullWidth sx={{ ...styles.button }} onClick={handleLoginButtonClick}>
          Login and Join with my account
        </Button>
      </Card>
    </Grid>
  );
}

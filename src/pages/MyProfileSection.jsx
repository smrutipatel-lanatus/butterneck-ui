import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileAndEditUserCustom } from '../common/ProfileAndEditUserCustom';

const UploadButton = ({ onChange, name, label, disabled }) => {
  return (
    <Box className={'MuiFormControl-root MuiTextField-root'} textAlign="center">
      <input
        name={name}
        id="contained-button-file"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        style={{ display: 'none' }}
        onChange={onChange}
        disabled={disabled}
        value=""
      />
      <label htmlFor="contained-button-file">
        <Button color="primary" aria-label="Upload scan file." variant="contained" component="span" disabled={disabled}>
          {label}
        </Button>
      </label>
    </Box>
  );
};

export const MyProfileSection = () => {
  const methods = useForm();

  const [preview, setPreview] = useState();

  const submit = () => {
    console.log('submitted');
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const avatarSrc = preview ? preview : 'A';

  return (
    <Card sx={{ mx: { xs: 4, sm: 15, md: 30, lg: 55 }, my: 5, overflow: 'visible' }}>
      <Avatar src={avatarSrc} sx={{ margin: 'auto', transform: 'translateY(-25%)', width: 100, height: 100 }}>
        {avatarSrc}
      </Avatar>
      <UploadButton onChange={onFileInputChange} name="avatar" label="Change your avatar" />
      <Typography
        textAlign="center"
        sx={{ textDecoration: 'underline', my: 2, '&:hover': { cursor: 'pointer' } }}
        onClick={() => setPreview()}
      >
        Remove my avatar and show my initials instead
      </Typography>{' '}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <ProfileAndEditUserCustom isProfileSectionField />
        </form>
      </FormProvider>
    </Card>
  );
};

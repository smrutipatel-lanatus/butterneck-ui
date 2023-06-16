import { Box, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const FormDateField = ({
  name,
  label,
  required,
  autoFocus = false,
  message,
  format = 'DD/MM/YYYY',
  inputProps,
  labelProps,
  placeholder,
  disablePast,
  sx,
  ...muiProps
}) => {
  const { control } = useFormContext();

  return (
    <>
      <Box
        sx={
          sx || {
            mb: 2,
          }
        }
      >
        {label && (
          <Typography variant="body1" fontWeight="bold" mb={0.5} {...labelProps}>
            {label}
          </Typography>
        )}
        <Controller
          name={name}
          control={control}
          rules={{
            required: {
              value: required,
              message: `${label} is required.`,
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                size="small"
                name={name}
                placeholder={placeholder}
                autoFocus={autoFocus}
                fullWidth
                variant="outlined"
                type={'date'}
                onChange={onChange}
                value={value}
                defaultValue={value}
                error={!!error?.message}
                helperText={error?.message}
                FormHelperTextProps={{ sx: { ml: 0 } }}
                inputProps={{
                  min: disablePast ? dayjs().format('YYYY-MM-DD') : null,
                }}
                {...inputProps}
                {...muiProps}
              />
            );
          }}
        />
      </Box>
    </>
  );
};

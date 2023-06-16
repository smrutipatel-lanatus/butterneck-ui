import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { constants } from '../../utils/constants';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function FormInputField({
  name,
  required,
  type,
  label,
  autoFocus,
  maxLength,
  inputProps,
  labelProps,
  placeholder,
  sx,
  ...muiProps
}) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const SecureFieldIcon = showPassword ? VisibilityOffIcon : VisibilityIcon;

  return (
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
          pattern: type === 'email' && { value: constants.emailPattern, message: 'Invalid email format' },
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
              type={type === 'email' ? '' : type === 'password' && showPassword ? 'text' : type}
              onChange={onChange}
              value={value}
              defaultValue={value}
              error={!!error?.message}
              helperText={error?.message}
              FormHelperTextProps={{ sx: { ml: 0 } }}
              InputProps={{
                endAdornment: type === 'password' && (
                  <InputAdornment position="end">
                    <SecureFieldIcon sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)} />
                  </InputAdornment>
                ),
              }}
              onWheel={(e) => e.target.blur()}
              inputProps={{
                onInput: ({ target }) => {
                  if (target.value.length > maxLength) {
                    target.value = target.value.slice(0, maxLength);
                  }
                },
              }}
              {...inputProps}
              {...muiProps}
            />
          );
        }}
      />
    </Box>
  );
}

FormInputField.defaultProps = {
  type: 'text',
};

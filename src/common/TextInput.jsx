import { InputAdornment, TextField, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';

export const TextInput = ({ title, name, onChange, isPasswordField, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Typography variant="subtitle1" mb={0.5} fontWeight={700}>
        {title}
      </Typography>

      <TextField
        required
        name={name}
        size="small"
        variant="outlined"
        sx={{ mb: 1 }}
        type={type ? type : isPasswordField && (showPassword ? 'text' : 'password')}
        InputProps={{
          endAdornment: isPasswordField && (
            <InputAdornment position="end">
              {showPassword ? (
                <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(false)} />
              ) : (
                <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(true)} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={onChange}
        fullWidth
      />
    </>
  );
};

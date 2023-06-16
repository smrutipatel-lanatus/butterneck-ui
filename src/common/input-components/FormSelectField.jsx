import { Box, FormControl, MenuItem, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export function FormSelectField({
  name,
  required,
  options = [],
  label,
  errorMessage,
  helperText,
  sxProps,
  ...muiProps
}) {
  const { control } = useFormContext();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" fontWeight="bold" mb={0.5}>
        {label}
      </Typography>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          rules={{
            required: { message: 'Please Select any One', value: required },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                select
                fullWidth
                size="small"
                sx={{ ...sxProps }}
                onChange={onChange}
                value={value}
                error={!!error?.message}
                helperText={error?.message}
                FormHelperTextProps={{ sx: { ml: 0 } }}
                SelectProps={{
                  MenuProps: {
                    sx: {
                      '& .MuiPaper-root': {
                        boxShadow:
                          '0px 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%) !important',
                        maxHeight: '14.5rem',
                      },
                    },
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          paddingY: 2,
                        },
                      },
                    },
                  },
                }}
                {...muiProps}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            );
          }}
        />
      </FormControl>
    </Box>
  );
}

import { Autocomplete, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorHelper from '../ErrorHelper';

export function FormAutocompleteField({
  sx,
  label,
  labelProps,
  placeholder,
  options,
  name,
  required = false,
  inputProps,
  ...autocompleteProps
}) {
  const {
    setValue,
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  return (
    <Fragment>
      {label && (
        <Typography variant="body1" fontWeight="bold" mb={0.5} {...labelProps}>
          {label}
        </Typography>
      )}

      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={() => {
          return (
            <Fragment>
              <Autocomplete
                multiple
                options={options}
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option.value === value.value}
                sx={{ mb: 2, ...sx }}
                onChange={(_, value) => {
                  setValue(
                    name,
                    value.map(({ value }) => value)
                  );
                  clearErrors(name);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder={placeholder} size="small" {...inputProps} />
                )}
                {...autocompleteProps}
              />
              {errors[name] && <ErrorHelper message={errors[name].message || 'Invalid input'} />}
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
}

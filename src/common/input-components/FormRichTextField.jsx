import { Typography } from '@mui/material';
import { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorHelper from '../ErrorHelper';
import { RichTextbox } from './RichTextbox';

export function FormRichTextField({ sx, editorStyles, toolbarStyles, name, label, required = false, ...labelProps }) {
  const {
    setValue,
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const onValueChange = (newValue) => {
    if (newValue !== '<p><br></p>' && newValue !== '') {
      setValue(name, newValue);
      clearErrors(name);
    } else {
      setValue(name, '');
    }
  };

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
              <RichTextbox
                onChange={(val) => onValueChange(val)}
                sx={sx}
                editorStyles={editorStyles}
                toolbarStyles={toolbarStyles}
                name={name}
              />
              {errors[name] && <ErrorHelper message={errors[name].message || 'Invalid input'} />}
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
}

import { Box, Button, Card, Dialog, Divider, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputField } from '../common/input-components/FormInputField';

const companies = [
  { id: 1, companyName: 'FG' },
  { id: 2, companyName: 'Gowrk' },
  { id: 3, companyName: 'Lanatus' },
  { id: 4, companyName: 'House' },
];

const CompanyNameList = ({ selectedCompany, onClose }) => {
  console.log(selectedCompany);

  const methods = useForm({ defaultValues: { companyName: selectedCompany.companyName } });

  const { getValues } = methods;

  const onSubmit = () => {
    const updatedData = { ...selectedCompany, companyName: getValues('companyName') };
    onClose(updatedData);
  };
  return (
    <>
      <Dialog
        onClose={() => onClose(null)}
        open={Object.keys(selectedCompany).length}
        sx={{ maxWidth: 'xl' }}
        fullWidth
      >
        <Card>
          <Typography sx={{ textAlign: 'center', my: 2 }} variant="h4" fontWeight={700}>
            Rename {selectedCompany.companyName}
          </Typography>
          <Divider sx={{ width: '100%', my: 2 }} />
          <Box sx={{ mx: { xs: 2, sm: 10 } }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Rename {selectedCompany.companyName} to...
            </Typography>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormInputField name="companyName" placeholder="Type the new company name here" required />
                <Button type="submit" variant="contained" sx={{ mb: 2 }}>
                  Rename this company
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Card>
      </Dialog>
    </>
  );
};

export const RenameAccount = () => {
  const [companyNameArray, setCompanyNameArray] = useState(companies);

  const [selectedCompany, setSelectedCompany] = useState('');

  const deleteCompanyName = (deleteId) => {
    return setCompanyNameArray(companyNameArray.filter((item) => item.id !== deleteId));
  };

  const handleClickOpen = (idCompany) => {
    setSelectedCompany({
      id: companyNameArray.find(({ id }) => id === idCompany).id,
      companyName: companyNameArray.find(({ id }) => id === idCompany).companyName,
    });
  };

  const handleClose = (newData) => {
    console.log({ newData });
    if (newData !== null) {
      const item = companyNameArray.find(({ id }) => id === newData.id);
      const id = companyNameArray.indexOf(item);

      const temp = companyNameArray;

      temp[id] = newData;

      setCompanyNameArray(temp);
    }

    setSelectedCompany(undefined);
  };

  return (
    <Card sx={{ mx: { sm: 10, xs: 3 }, px: { xs: 4, md: 0 }, mt: 5 }}>
      <Grid container justifyContent="center">
        <Grid item my={2}>
          <Typography variant="h4" fontWeight={700}>
            Manage companies
          </Typography>
        </Grid>
        <Grid item width="100%">
          <Divider sx={{ my: 1 }} />
        </Grid>
        <Grid item my={2}>
          <Typography variant="subtitle1">
            Deleting a company won’t delete its people or their access to projects.
          </Typography>
        </Grid>
      </Grid>
      {companyNameArray.map(({ id, companyName }) => {
        return (
          <>
            <Grid container px={{ xs: 2, md: 16 }} justifyContent="space-between" key={id}>
              <Grid item>
                <Typography variant="subtitle1">{companyName}</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <DeleteIcon sx={{ mr: 1 }} cursor="pointer" onClick={() => deleteCompanyName(id)} />
                <Button variant="outlined" onClick={() => handleClickOpen(id)}>
                  Rename
                </Button>
              </Grid>
              <Divider sx={{ width: '100%', my: 2 }} />
            </Grid>
          </>
        );
      })}

      {selectedCompany ? (
        <CompanyNameList
          selectedCompany={selectedCompany}
          onClose={handleClose}
          setSelectedCompany={setSelectedCompany}
        />
      ) : null}
    </Card>
  );
};

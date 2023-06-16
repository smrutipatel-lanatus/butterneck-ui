import React, { useState } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import { Settings } from '@mui/icons-material';

export const HomeLogoBox = () => {
  const companyName = 'Lanatus Systems';
  const [logoFlags, setLogoFlags] = useState({
    logoImage: false,
    showLogo: false,
    selectLogo: false,
    companyName: false,
    saveOption: false,
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogoFlags({
        ...logoFlags,
        logoImage: reader,
        showLogo: true,
        saveOption: true,
      });
    };
  };

  let logo = (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          '&:hover .settings-button': {
            display: 'block',
          },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoFlags?.logoImage.result}
          alt="logo"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
          }}
        />
        <Settings
          className="settings-button"
          onClick={() => {
            setLogoFlags({
              ...logoFlags,
              companyName: true,
            });
          }}
          sx={{
            position: 'absolute',
            top: '0rem',
            right: '-1.5rem',
            display: 'none',
            cursor: 'pointer',
          }}
        />
      </Box>
      {logoFlags.companyName && (
        <Box>
          <Typography
            sx={{ textDecoration: 'underline' }}
            display="block"
            onClick={() => {
              setLogoFlags({
                logoImage: false,
                showLogo: false,
                selectLogo: false,
                companyName: false,
              });
            }}
          >
            Just display our company name
          </Typography>
        </Box>
      )}
      {logoFlags.saveOption && (
        <Box>
          <Button
            onClick={() => {
              setLogoFlags({
                ...logoFlags,
                saveOption: false,
              });
            }}
          >
            Save
          </Button>
          <Button>Cancel</Button>
        </Box>
      )}
    </>
  );

  let inputLogo = (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: 0,
        borderStyle: 'dashed',
        padding: 1,
      }}
    >
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        onChange={handleLogoChange} // Corrected here
      />
    </Box>
  );

  let companyNameText = (
    <>
      <Button
        className="addYourLogo"
        variant="outlined"
        sx={{
          border: '1px solid black',
          borderRadius: 0,
          borderStyle: 'dashed',
          display: 'none',
          '&:hover': { borderStyle: 'dashed' },
        }}
        onClick={() =>
          setLogoFlags({
            ...logoFlags,
            selectLogo: true,
          })
        }
      >
        Add your logo...
      </Button>
      <Typography
        sx={{
          fontSize: '1.5rem',
        }}
        className="logoText"
      >
        {companyName}
      </Typography>
    </>
  );

  return (
    <Grid container item sm={12} justifyContent={'center'} p={1}>
      <Box
        sx={{
          '&:hover .addYourLogo': {
            display: 'block',
          },
          '&:hover .logoText': {
            display: 'none',
          },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {logoFlags.showLogo ? logo : logoFlags.selectLogo ? inputLogo : companyNameText}
      </Box>
      <input type="file" name="profileImage" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
    </Grid>
  );
};

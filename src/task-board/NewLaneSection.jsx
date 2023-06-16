import { Button } from '@mui/material';

export const NewLaneSection = (props) => {
  return (
    <Button variant="contained" sx={{ borderRadius: 1, mt: 0.5 }} onClick={props.onClick}>
      Add another stage
    </Button>
  );
};

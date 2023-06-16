import { Button } from '@mui/material';

const button = {
  title: 'Components/Button',
  argTypes: {
    children: 'Butterneck',
    variant: {
      options: ['contained', 'outlined', 'text'],
      type: 'select',
    },
    color: {
      options: ['primary', 'secondary', 'success'],
      type: 'select',
    },
    onClick: { action: 'clicked' },
  },
};

export const Template = (args) => {
  return <Button {...args}>Butterneck</Button>;
};

export default button;

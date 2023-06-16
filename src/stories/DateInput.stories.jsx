import { DateInput as CommonDateInput } from '../common/input-components/DateInput';
import { ThemeProvider } from '@mui/material';
import getTheme from '../theme';
import CommonFormProvider from '../common/stories/CommonFormProvider';

const theme = getTheme('light');
const DateInputField = {
  title: 'Components/DateInput',
  component: CommonDateInput,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CommonFormProvider>
          <Story />
        </CommonFormProvider>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      options: ['small', 'medium'],
      type: 'select',
    },
    onChange: {
      action: 'changed',
      onchange: (e) => ({ value: e.target.value }),
    },
  },
};

const Default = (args) => {
  return <CommonDateInput {...args} />;
};

export const dateField = {
  ...Default,
  args: {
    label: 'Date',
    name: 'Field10',
    format: 'MM/DD/YYYY',
    autoFocus: true,
    validations: true,
    size: 'small',
    errorMessage: 'Select Date field',
  },
};

export default DateInputField;

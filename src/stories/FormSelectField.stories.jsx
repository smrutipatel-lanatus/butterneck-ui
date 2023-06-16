import { FormSelectField as CommonFormSelectField } from '../common/input-components/FormSelectField';
import CommonFormProvider from '../common/stories/CommonFormProvider';

const FormSelectField = {
  title: 'Components/FormSelectField',
  component: CommonFormSelectField,
  decorators: [
    (Story) => (
      <CommonFormProvider>
        <Story />
      </CommonFormProvider>
    ),
  ],
  argTypes: {
    size: {
      options: ['small', 'medium'],
      control: 'select',
    },
    onchange: {
      action: 'changed',
      onchange: (e) => ({ value: e.target.value }),
    },
  },
};

const Default = (args) => {
  return <CommonFormSelectField {...args} />;
};
export const SelectField = {
  ...Default,
  args: {
    validations: { required: true },
    name: 'Field8S',
    options: [
      { name: 'light', value: 'light' },
      { name: 'dark', value: 'dark' },
    ],
    label: 'Select Fld1',
    autoFocus: true,
    errorMessage: 'Please Select option',
  },
};

export default FormSelectField;

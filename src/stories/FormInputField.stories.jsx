import { FormInputField as CommonFormInputField } from '../common/input-components/FormInputField';
import CommonFormProvider from '../common/stories/CommonFormProvider';

const FormInputField = {
  title: 'Components/FormInputField',
  component: CommonFormInputField,
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
      type: 'select',
    },
    type: {
      options: ['text', 'number'],
      type: 'select',
    },
    onChange: {
      action: 'changed',
      onchange: (e) => ({ value: e.target.value }),
    },
  },
};

const Default = (args) => {
  return <CommonFormInputField {...args} />;
};

export const TextField = {
  ...Default,
  args: {
    name: 'Field1',
    label: 'Field Lbl1',
    type: 'text',
    size: 'small',
    maxLength: 10,
    validations: { required: true },
    autoFocus: true,
    errorMessage: 'This field is required',
  },
};

export const EmailField = {
  ...Default,
  args: {
    name: 'Field2',
    label: 'Email Fld1',
    type: 'email',
    maxLength: 20,
    validations: { required: true },
    autoFocus: true,
    errorMessage: 'Invalid Email',
  },
};

export const PasswordField = {
  ...Default,
  args: {
    name: 'passwordField',
    label: 'Password',
    type: 'password',
    maxLength: 20,
    validations: { required: true },
    autoFocus: true,
    errorMessage: 'Invalid password',
  },
};

export default FormInputField;

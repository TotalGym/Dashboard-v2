import { InputHTMLAttributes } from "react";

import { FormInputTypes } from "./form-input.types";

import { AuthInput, CheckboxInput, StyledLable } from "./form-input.styles";

const getFormInput = (formInputType: FormInputTypes) =>
  ({
    [FormInputTypes.AuthInput]: AuthInput,
    [FormInputTypes.CheckboxInput]: CheckboxInput,
  }[formInputType]);

type FormInputProps = {
  formInputType: FormInputTypes;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ formInputType, label, ...otherProps }: FormInputProps) => {
  const SelectedFormInput = getFormInput(formInputType);
  return (
    <div>
      <SelectedFormInput {...otherProps} />
      {label && <StyledLable htmlFor={otherProps.id}>{label}</StyledLable>}
    </div>
  );
};

export default FormInput;

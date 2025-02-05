import { InputHTMLAttributes } from "react";

import { FormInputTypes } from "./form-input.types";

import {
  AuthInput,
  CheckboxInput,
  ModalInput,
  SearchInput,
  StyledLable,
} from "./form-input.styles";

const getFormInput = (formInputType: FormInputTypes) =>
  ({
    [FormInputTypes.AuthInput]: AuthInput,
    [FormInputTypes.CheckboxInput]: CheckboxInput,
    [FormInputTypes.SearchInput]: SearchInput,
    [FormInputTypes.modalInput]: ModalInput,
  }[formInputType]);

type FormInputProps = {
  formInputType: FormInputTypes;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ formInputType, label, ...otherProps }: FormInputProps) => {
  const SelectedFormInput = getFormInput(formInputType);
  return (
    <div>
      {label && <StyledLable htmlFor={otherProps.id}>{label}</StyledLable>}
      <SelectedFormInput {...otherProps} />
    </div>
  );
};

export default FormInput;

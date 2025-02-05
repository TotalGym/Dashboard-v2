import { ButtonHTMLAttributes, ReactNode } from "react";

import CloseIcon from "../../assets/close-icno.svg?react";

import { ButtonTypes } from "./button.types";
import { BasicButton, CloseModalButton } from "./button.styles";

const getButton = (buttonType = ButtonTypes.basic) =>
  ({
    [ButtonTypes.basic]: BasicButton,
    [ButtonTypes.closeModal]: CloseModalButton,
  }[buttonType]);

export type ButtonProps = {
  isLoading?: boolean;
  children?: ReactNode;
  buttonType?: ButtonTypes;
  width?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isLoading,
  children,
  buttonType,
  width,
  ...otherProps
}: ButtonProps) => {
  const SelectedButton = getButton(buttonType);
  return (
    <SelectedButton {...otherProps} $width={width}>
      {buttonType === ButtonTypes.closeModal ? <CloseIcon /> : null}
      {isLoading ? "loading..." : children}
    </SelectedButton>
  );
};

export default Button;

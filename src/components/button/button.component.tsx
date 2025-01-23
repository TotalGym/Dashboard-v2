import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.styles";
import { ButtonTypes } from "./button.types";
import { BasicButton } from "./button.styles";

const getButton = (buttonType = ButtonTypes.basic) =>
  ({ [ButtonTypes.basic]: BasicButton }[buttonType]);

export type ButtonProps = {
  isLoading?: boolean;
  children: ReactNode;
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
      {isLoading ? "loading..." : children}
    </SelectedButton>
  );
};

export default Button;

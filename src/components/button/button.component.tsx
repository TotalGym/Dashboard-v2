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
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isLoading,
  children,
  buttonType,
  ...otherProps
}: ButtonProps) => {
  const SelectedButton = getButton(buttonType);
  return (
    <SelectedButton {...otherProps}>
      {isLoading ? "loading..." : children}
    </SelectedButton>
  );
};

export default Button;

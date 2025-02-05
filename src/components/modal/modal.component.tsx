import { ReactNode } from "react";
import ReactDOM from "react-dom";

import Button from "../button/button.component";

import { ButtonTypes } from "../button/button.types";
import { ModalContainer, ModalOverLay, ModalTitle } from "./modal.styles";

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
};

const Modal = ({ open, closeModal, title, children }: ModalProps) => {
  if (!open) return null;

  const portalElement = document.getElementById("portal");

  if (!portalElement) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverLay />
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <Button buttonType={ButtonTypes.closeModal} onClick={closeModal} />
        {children}
      </ModalContainer>
    </>,
    portalElement
  );
};
export default Modal;

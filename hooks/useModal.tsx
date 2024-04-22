import { ReactNode, useRef, useState } from "react";
import { Modal, ModalProps } from "../components/delRecipe/Modal";

export type UseModalResp = {
  modal: ReactNode;
  closeModal: () => void;
  openModal: (data: string) => void;
  modalBoxClassName?: string;
  data?: string; // Include a property to hold the data
};

export type UseModalProps = Omit<ModalProps, "onBackdropClick"> & {
  shouldAllowBackdropClick?: boolean;
  onModalOpen?: () => void;
  onModalClose?: () => void;
};

export const useModal = ({
  children,
  modalBoxClassName,
  shouldAllowBackdropClick = true,
  onModalClose,
  onModalOpen,
}: UseModalProps): UseModalResp => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [data, setData] = useState<string>(""); // State to hold the data

  const closeModal = () => {
    onModalClose && onModalClose();
    ref.current?.close();
  };

  const openModal = (data: string) => {
    onModalOpen && onModalOpen();
    setData(data); // Set the data
    ref.current?.showModal();
  };

  const modal: ReactNode = (
    <Modal
      onBackdropClick={() => {
        if (shouldAllowBackdropClick) {
          closeModal();
        }
      }}
      ref={ref}
      modalBoxClassName={modalBoxClassName}
      data={data}
    >
      {children}
    </Modal>
  );

  return {
    closeModal,
    openModal,
    modal,
    data, // Include data in the returned object
  };
};

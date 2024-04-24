import { ReactNode, useRef, useState } from "react";
import { Modal, ModalProps } from "../components/delRecipe/Modal";
import axios from "axios";
export type UseModalResp = {
  modal: ReactNode;
  closeModal: () => void;
  openModal: (data: string, id: any) => void;
  modalBoxClassName?: string;
  data?: string; // Include a property to hold the data
  id?: any;
};

export type UseModalProps = Omit<ModalProps, "onBackdropClick"> & {
  shouldAllowBackdropClick?: boolean;
  onModalOpen?: () => void;
  onModalClose?: () => void;
  onClickDelete?: () => void;
};

export const useModal = ({
  children,
  modalBoxClassName,
  shouldAllowBackdropClick = true,
  onModalClose,
  onModalOpen,
  onClickDelete,
}: UseModalProps): UseModalResp => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [data, setData] = useState<string>(""); // State to hold the data
  const [id, setId] = useState();
  const closeModal = () => {
    onModalClose && onModalClose();
    ref.current?.close();
  };

  const openModal = (data: string, id: any) => {
    onModalOpen && onModalOpen();
    setData(data); // Set the data
    setId(id);
    ref.current?.showModal();
  };
  const deleteItem = () => {};
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
      id={id}
    >
      {children}
    </Modal>
  );

  return {
    closeModal,
    openModal,
    modal,
    data,
    id, // Include data in the returned object
  };
};

import { forwardRef, ReactNode } from "react";
import axios from "axios";
export type ModalProps = {
  children?: ReactNode;
  onBackdropClick?: () => void;
  modalBoxClassName?: string;
  data?: string;
  id?: any;
  // you can add more classNames as per your level of customisation needs
};

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, modalBoxClassName, onBackdropClick, data, id }, ref) => {
    console.log(id);
    return (
      <dialog ref={ref} className="modal">
        <div className={`modal-box ${modalBoxClassName ?? ""}`}>
          <p className="font-bold text-2xl">{data}</p>
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            type="button"
            onClick={() => {
              onBackdropClick && onBackdropClick();
            }}
          >
            close
          </button>
        </form>
      </dialog>
    );
  }
);

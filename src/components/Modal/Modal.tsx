import { ReactNode } from "react";

interface ModalProps {
  title: string;
  content: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal = ({ title, content, onClose, onConfirm }: ModalProps) => {
  return (
    <dialog id="custom_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{content}</div>
        <div className="modal-action">
          {onConfirm && (
            <button className="btn btn-primary" onClick={onConfirm}>
              Confirm
            </button>
          )}
          <button className="btn btn-error" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;

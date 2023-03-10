import { ReactNode } from 'react';

export type PropsWithChildren = { children?: ReactNode };
export type ModalProps = {
  onClose: React.MouseEventHandler<HTMLDivElement> | undefined;
};

function Modal({ children, onClose }: PropsWithChildren & ModalProps) {
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <dialog
        className='modal'
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}

export default Modal;

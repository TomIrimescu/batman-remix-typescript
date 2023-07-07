import { MouseEventHandler, ReactNode } from 'react';

export type ModalRouteProps = {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
};

function ModalRoute({ children, onClose }: ModalRouteProps) {
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

export default ModalRoute;

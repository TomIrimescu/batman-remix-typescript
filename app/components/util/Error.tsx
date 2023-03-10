import { ReactNode } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

export type PropsWithChildren = { children?: ReactNode };
export type ErrorProps = {
  title: string;
};

function Error({ title, children }: ErrorProps & PropsWithChildren) {
  return (
    <div className='error'>
      <div className='icon'>
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;

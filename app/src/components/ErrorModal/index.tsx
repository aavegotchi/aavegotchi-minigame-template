import { Modal } from '../Modal';
import { CustomError } from 'types';

interface Props {
  error: CustomError | unknown;
  onHandleClose?: () => void;
}

export const ErrorModal = ({ error, onHandleClose }: Props) => {

  const handleClose = () => {
    if (onHandleClose) onHandleClose();
  }

  const err = error as CustomError;

  return (
    <Modal onHandleClose={handleClose}>
      <h3>Status Code: {err.status || 400}</h3>
      <h2>{err.name}</h2>
      <p>{err.message}</p>
      {err.stack && (
        <pre>
          <code>
            {err.stack}
          </code>
        </pre>
      )}
    </Modal>
  )
}
import { Modal } from '../Modal';
import { CustomError } from 'types';

interface Props {
  error: CustomError;
  onHandleClose?: () => void;
}

export const ErrorModal = ({ error, onHandleClose }: Props) => {

  const handleClose = () => {
    if (onHandleClose) onHandleClose();
  }

  return (
    <Modal onHandleClose={handleClose}>
      <h3>Status Code: {error.status || 400}</h3>
      <h2>{error.name}</h2>
      <p>{error.message}</p>
      {error.stack && (
        <pre>
          <code>
            {error.stack}
          </code>
        </pre>
      )}
    </Modal>
  )
}
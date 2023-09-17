import { Button } from '../../../components/atomics/Button';
import { Modal, ModalBody, ModalFooter, } from '../../../components/atomics/Modal';
import { useHistory } from "react-router-dom";
import { removeAxiosAuthHeader } from "../../../features/axios";
import { clearAuthTokenInLocalStorage } from '../../../features/auth/processors';

export function LogoutDialog({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleLogout?: () => void;
  toggleModal: () => void;
}) {
  let history = useHistory();

  const onLogout = () => {
    clearAuthTokenInLocalStorage();
    removeAxiosAuthHeader();
    sessionStorage.clear();
    history.push("/login");
  };

  return (
    <Modal
      show={isOpen}
      onHide={toggleModal}
      aria-labelledby="logout-dialog-modal"
      className='min-w-fit max-w-xl'
    >
      <div>
        <ModalBody>Log out of your Kaidu account?</ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal} variant="light">
            Cancel
          </Button>
          <Button onClick={onLogout} variant="primary" autoFocus>
            Logout
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}

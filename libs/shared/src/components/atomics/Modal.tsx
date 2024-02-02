import MuiDialog from '@mui/material/Dialog';
import MuiModal from '@mui/material/Modal';
import MuiDialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';

const ContentContainer = styled.div`
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function Dialog({ show, onHide, ...optionals }) {
  const { children, ...rest } = optionals;
  return (
    <MuiDialog open={show} onClose={onHide} {...rest}>
      {children}
    </MuiDialog>
  );
}

export const BaseModal = MuiModal;

/**
 *
 */
export function Modal({ children, ...optionals }) {
  const { show, onHide, className = '', header, ...rest } = optionals;
  return (
    <MuiModal open={show} onClose={onHide} {...rest}>
      <ContentContainer
        className={`m-auto bg-white w-4/5 max-h-full rounded-md ${className}`}
      >
        {header ? header : null}
        {children}
      </ContentContainer>
    </MuiModal>
  );
}

export function DialogContent({ children, ...rest }) {
  return <MuiDialogContent {...rest}>{children}</MuiDialogContent>;
}

export function ModalBody({ children, ...rest }) {
  return (
    <div className={`p-4`} {...rest}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, ...optionals }) {
  const { className = '', ...rest } = optionals;
  return (
    <div className={`p-4 space-x-2 flex justify-end ${className}`} {...rest}>
      {children}
    </div>
  );
}

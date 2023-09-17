import Dialog from '@mui/material/Dialog';
// import { useState } from 'react';
// import { Icon } from '@root/shared/components';
import { useSWRConfig } from 'swr';
import { AddBoxDialog } from '../AddBoxDialog';
import { DeleteBoxDialog } from '../DeleteBoxDialog';
import { EditCardDialog } from '../EditCardDialog';
import { useModal, useUser } from '../../../hooks';

/**
 * UI for all Modal dialogs
 */
export function ModalGroup(props) {
  const isDialogOpened = useModal((state) => state.isDialogOpened);
  const operation = useModal((state) => state.operation);
  // const openDialog = useModal((state) => state.openDialog);
  const closeDialog = useModal((state) => state.closeDialog);
  const modalData = useModal((state) => state.data);
  const modalItemId = modalData?._id;
  // console.log("file: index.tsx:19 ~ ModalGroup ~ modalData", modalData);

  const { data: userData, error: userError } = useUser();

  return (
    <Dialog open={isDialogOpened} onClose={closeDialog}>
      {!operation || operation == 'add' ? (
        <AddBoxDialog
          onHide={closeDialog}
          onConfirm={closeDialog}
          data={userData}
        />
      ) : null}
      {operation === 'delete' ? (
        <DeleteBoxDialog
          onHide={closeDialog}
          onConfirm={closeDialog}
          data={modalData}
        />
      ) : null}
      {operation === 'editCard' ? (
        <EditCardDialog
          onHide={closeDialog}
          onConfirm={closeDialog}
          data={{...modalData, userID: userData?.id}}
          key={`edit-card-dialog-${modalItemId}`}
        />
      ) : null}
    </Dialog>
  )
}

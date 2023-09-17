// import DialogTitle from '@mui/material/DialogTitle';
// import { Button, TextField, Typography } from '@root/shared/components';
// import { Controller, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import {
  ALL_BOX,
  CreateBoxDTO,
  UpdateCardDTO,
  updateCard,
} from '../../features/idea-server';
import { EditorContent } from './Editor';
import DialogTitle from '@mui/material/DialogTitle';
import { EditCardMenu } from './EditCardMenu';
import { CloseIcon } from '@root/shared/components/atomics/Icon';
import { IconButton } from '@root/shared/components/atomics/IconButton'
import { useModal, selectSetModalData } from '../../hooks';

/**
 * UI Modal for editing cards
 */
export function EditCardDialog({ onConfirm, onHide, data, ...optionals }) {
  const { userID, ...restData } = data || {};

  // Hooks
  const { mutate } = useSWRConfig();
  const setModalData = useModal(selectSetModalData);
  const closeDialog = useModal((state) => state.closeDialog);

  const handleConfirm = async (data) => {
    const { cardData } = data || {};
    const { _id } = restData;
    const { title, content, boxes } = cardData;

    const updateData: UpdateCardDTO = {
      _id,
      title,
      content,
      boxes,
    };
    console.debug('update data', updateData);
    await updateCard(updateData);

    // update states
    setModalData({...data, ...updateData});
    mutate(ALL_BOX);

    // callback
    onConfirm();
  };

  return (
    <div data-cy={'edit-card-dialog'}>
      <DialogTitle className="flex justify-between">
        <span>Edit Card</span>
        <div className='flex gap-x-1 items-center'>
          <EditCardMenu data={data} onConfirm={onConfirm} />
          <IconButton onClick={onHide}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <div className="p-4 w-full">
        <EditorContent
          userID={userID}
          onSubmit={handleConfirm}
          defaultValues={restData}
        />
      </div>
    </div>
  );
}

import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Typography } from '@root/shared/components';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { addBox, ALL_BOX, CreateBoxDTO, deleteBox } from '../../features/idea-server';


/**
 * UI Modal for deleting a box
 */
export function DeleteBoxDialog({ onConfirm, onHide, data, ...optionals }) {
  // Hooks
  // const { handleSubmit, control } = useForm();
  const { mutate } = useSWRConfig();

  const handleDeleteBoxSubmit = () => {
    const {id, name} = data || {};
    if (!id) {
      return null;
    }
    console.debug('submit data', id);
    deleteBox(id)
      .then(() => toast.success(`Deleted box ${name}`))
      .catch(() => toast.error(`Failed to delete box`))
      .finally(() => {
        mutate(ALL_BOX);
        onConfirm();
      });
  };

  return (
    <>
      <DialogTitle>Delete a box</DialogTitle>
      <div className="p-4">
        <div className="my-2">
          <Typography>Delete?</Typography>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={handleDeleteBoxSubmit}>Save</Button>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

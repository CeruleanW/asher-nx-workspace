import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@root/shared/components';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { addBox, ALL_BOX, CreateBoxDTO } from '../../features/idea-server';


/**
 * UI Modal for adding a box
 */
export function AddBoxDialog({ onConfirm, onHide, data, ...optionals }) {
  // Hooks
  const { handleSubmit, control } = useForm();
  const { mutate } = useSWRConfig();

  const handleAddBoxSubmit = (formValues) => {
    console.debug('add box form data', formValues);
    const { name } = formValues || {};
    const { _id } = data || {};
    const input: CreateBoxDTO = { name, owner: _id };
    console.debug('submit data', input);
    addBox(input)
      .then(() => toast.success(`Add box ${name}`))
      .catch(() => toast.error(`Failed to add a box`))
      .finally(() => {
        mutate(ALL_BOX);
        onConfirm();
      });
  };

  return (
    <>
      <DialogTitle>Create a box</DialogTitle>
      <div className="p-4">
        <div className="my-2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Box name" {...field} />
            )}
          />
        </div>
        <div className="flex gap-x-2">
          <Button onClick={handleSubmit(handleAddBoxSubmit)}>Save</Button>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

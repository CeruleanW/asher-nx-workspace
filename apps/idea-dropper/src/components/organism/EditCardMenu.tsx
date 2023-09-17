import { IconButton } from '@root/shared/components/atomics/IconButton';
import { Icon } from '@root/shared/components/atomics/Icon';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  Menu,
  MenuItem,
  MenuButton,
} from '@root/shared/components/molecule/Menu';
import { useRef, useState } from 'react';
import { ALL_BOX, deleteCard } from '../../features/idea-server';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

/**
 *
 */
export function EditCardMenu({ data, ...optionals }) {
  // Props
  const { onConfirm, ...rest } = optionals;
  const { _id } = data || {};

  const { mutate } = useSWRConfig();

  // Local states
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const handleDelete = () => {
    console.log('delete');
    deleteCard(_id)
      .then(() => {
        toast.success('Card deleted');
        onConfirm && onConfirm();
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete card');
      }).finally(() => {
        mutate(ALL_BOX);
      });
  };

  return (
    <div>
      <div ref={anchorRef}>
        <IconButton onClick={() => setOpen(!open)}>
          <Icon name={faEllipsisH} />
        </IconButton>
      </div>
      <Menu anchorEl={anchorRef.current} open={open} onClose={closeMenu}>
        <MenuItem onClick={handleDelete} disabled={!_id}>
          Delete
        </MenuItem>
        {/* <MenuItem onClick={closeMenu}>Close</MenuItem> */}
      </Menu>
    </div>
  );
}

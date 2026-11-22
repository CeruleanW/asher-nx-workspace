import { Card } from '@root/shared/components/atomics/Card';
import { Icon } from '@root/shared/components/atomics/Icon';
import { Typography } from '@root/shared/components/atomics/Typography';
import { Menu, MenuItem, ControlledMenu } from '@root/shared/components';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

/**
 * Interact with a single Card in Inbox
 */
export function InboxCard({ name, data, onMenuClicks, ...optionals }) {
  const { onEdit, onDelete } = onMenuClicks || {};

  // Local state & ref
  const [isOpen, setOpen] = useState(false);
  const cardActionRef = useRef(null);

  const handleClick = (e) => {
    // If clicking the menu trigger (if we had one separate), don't trigger edit
    // But here we might want the whole card to trigger edit, or right click for menu?
    // Let's stick to the BoxCard pattern: click opens menu? Or click opens editor directly?
    // "Inbox" usually implies checking content.
    // Let's make Left Click -> Edit/View
    // Right Click or Menu Icon -> Context Menu
    if (onEdit) onEdit(data);
  }

  const handleMenuTrigger = (e) => {
    e.stopPropagation();
    setOpen(!isOpen);
  }

  useClickAway(cardActionRef, () => {
    setOpen(false);
  });

  return (
    <div ref={cardActionRef} className="relative">
      <Card
        onClick={handleClick}
        className={'flex flex-col justify-between p-4 relative transition-transform cursor-pointer hover:rotate-0 hover:scale-105 hover:shadow-md'}
        style={{ minHeight: '8rem', minWidth: '8rem', backgroundColor: '#fff9c4', transform: 'rotate(-1deg)', transition: 'transform 0.2s' }}
      >
        <div className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5" onClick={handleMenuTrigger}>
          <Icon name="ellipsis-v" size={12} className="text-gray-500" />
        </div>
        <Typography className='text-md font-medium break-words pr-4' >{name}</Typography>
        <div className='flex justify-end mt-2' >
          <Icon name={'file-alt'} className="text-gray-400" />
        </div>
      </Card>

      <Menu anchorEl={cardActionRef.current} open={isOpen} onClose={() => setOpen(false)}>
        <MenuItem onClick={() => { onEdit && onEdit(data); setOpen(false); }}>Edit / View</MenuItem>
        <MenuItem onClick={() => { onDelete && onDelete(data); setOpen(false); }}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

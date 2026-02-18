import { Card } from '@root/shared/components/atomics/Card';
import { Icon } from '@root/shared/components/atomics/Icon';
import { Typography } from '@root/shared/components/atomics/Typography';
import { Menu, MenuItem, ControlledMenu } from '@root/shared/components';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  min-height: 8rem;
  min-width: 8rem;
  background-color: #fff9c4; // Post-it note color?
  transform: rotate(-1deg);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

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
      <StyledCard onClick={handleClick} className={'flex flex-col justify-between p-4 relative'}>
        <div className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5" onClick={handleMenuTrigger}>
          <Icon name="ellipsis-v" size={12} className="text-gray-500" />
        </div>
        <Typography className='text-md font-medium break-words pr-4' >{name}</Typography>
        <div className='flex justify-end mt-2' >
          <Icon name={'file-alt'} className="text-gray-400" />
        </div>
      </StyledCard>

      <Menu anchorEl={cardActionRef.current} open={isOpen} onClose={() => setOpen(false)}>
        <MenuItem onClick={() => { onEdit && onEdit(data); setOpen(false); }}>Edit / View</MenuItem>
        <MenuItem onClick={() => { onDelete && onDelete(data); setOpen(false); }}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

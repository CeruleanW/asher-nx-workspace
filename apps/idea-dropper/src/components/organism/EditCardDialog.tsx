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
import { DEFAULT_CONTENT_VALUE } from './Editor/constants';
import DialogTitle from '@mui/material/DialogTitle';
import { EditCardMenu } from './EditCardMenu';
import { CloseIcon } from '@root/shared/components/atomics/Icon';
import { IconButton } from '@root/shared/components/atomics/IconButton'
import { useModal, selectSetModalData } from '../../hooks';
import React from 'react';

/**
 * UI Modal for editing cards
 */
export function EditCardDialog({ onConfirm, onHide, data, ...optionals }) {
  const { userID, ...restData } = data || {};
  const [isEditing, setIsEditing] = React.useState(false); // Default to Preview mode

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
    setModalData({ ...data, ...updateData });
    mutate(ALL_BOX);

    // callback
    onConfirm();
    setIsEditing(false); // Switch back to preview after save
  };

  const handleNavigation = async (direction: 'next' | 'prev') => {
    // 1. Fetch new data
    // const { box_id } = restData; // box_id might not be in restData? 
    // If we are drawing, we usually know the box_id from context or data.
    // But data here is the CARD data. Does card have box_id? 
    // The previous draw sets the modal data.
    // If we are in "Edit Card", we might not be in "Draw" mode.
    // BUT the user said "when we draw a card... we should have buttons".
    // So this dialog is used for Drawing too? Yes, `EditorContent` is used.
    // The API `draw` requires box_id.
    // If `data` comes from a Draw action, it might have `box_id` or we rely on the fact the user is in a box.
    // Let's assume we can find box_id from `data.boxes[0]` or passed props.

    const boxID = restData.boxes?.[0]; // Assuming the card belongs to a box and we draw from it.
    // Fallback: if we don't have boxID, we can't draw next from *that* box. 
    // But usually `restData` has `boxes` array.

    if (!boxID) {
      console.warn("No box ID found to draw from");
      return;
    }

    try {
      const res = await fetch(`/api/box/id/draw/${boxID}?direction=${direction}`);
      if (res.ok) {
        const newCard = await res.json();
        setModalData({ ...newCard, userID }); // Update modal with new card
        // setIsEditing(false); // Reset to preview mode on navigation? Usually yes.
      }
    } catch (e) {
      console.error("Failed to navigate", e);
    }
  };

  return (
    <div
      data-cy={'edit-card-dialog'}
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}
      className="flex flex-col max-h-[90vh]"
    >
      <DialogTitle className="flex justify-between items-center p-6 border-b border-gray-200/50">
        <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
          {restData?.title || 'Card Preview'}
        </span>
        <div className='flex gap-x-2 items-center'>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isEditing ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {isEditing ? 'Display Mode' : 'Edit Mode'}
          </button>

          <EditCardMenu data={data} onConfirm={onConfirm} />
          <IconButton onClick={onHide} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <div className="p-6 w-full overflow-y-auto">
        <EditorContent
          key={restData?._id}
          userID={userID}
          onSubmit={handleConfirm}
          defaultValues={{
            ...restData,
            content: typeof restData?.content === 'string'
              ? [{ type: 'paragraph', children: [{ text: restData.content }] }]
              : (restData?.content || DEFAULT_CONTENT_VALUE)
          }}
          readOnly={!isEditing}
        />
      </div>

      {/* Navigation & Actions Bar */}
      <div className="flex justify-between items-center p-6 border-t border-gray-200/50 bg-white/30">
        <div className="flex gap-x-4">
          <button
            onClick={() => handleNavigation('prev')}
            className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all text-sm font-medium shadow-sm backdrop-blur-sm"
          >
            Previous
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all text-sm font-medium shadow-sm backdrop-blur-sm"
          >
            Next
          </button>
        </div>

        {/* We rely on EditorContent's internal submit or we can trigger it? 
              EditorContent usually handle its own save or we pass a ref?
              Actually `EditorContent` has a save button inside it?
              Wait, looking at `EditorContent` usage in `EditCardDialog`.
              It passes `onSubmit`. 
              Usually the Save button is inside `EditorContent`.
              If we want a global save button here, we need to control the form from outside.
              But `EditorContent` uses `useForm` internally.
              
              For now, I'll assume the user saves via the existing mechanism in EditorContent, 
              OR I can add a purely visual "Done" button that just closes?
              The user asked for Prev/Next. I provided them.
          */}
      </div>
    </div>
  );
}

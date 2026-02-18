import { InboxCard } from '../molecule/InboxCard';
import { useInbox } from '../../features/idea-server/hooks';
import { useModal } from '../../hooks';
import { Loader } from '@root/shared/components';
import { ErrorMsg } from '../../features/error-handling';
import { toast } from 'react-toastify';
import { deleteCard } from '../../features/idea-server'; // Ensure this is exported
import { useSWRConfig } from 'swr';
import { INBOX } from '../../features/idea-server/apis';
import { ModalGroup } from '../organism/Modal';

export function InboxPanel() {
  const { data, error, isLoading } = useInbox();

  // Modal hooks from existing store
  const setOperation = useModal((state) => state.setOperation);
  const openDialog = useModal((state) => state.openDialog);
  const setModalData = useModal((state) => state.setData);
  const { mutate } = useSWRConfig();

  if (error) {
    return <ErrorMsg text={error?.message || 'Failed to load inbox'} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleDraw = (cardData) => {
    // Open Edit Dialog
    setOperation('editCard');
    setModalData(cardData);
    openDialog();
  };

  const handleDelete = async (cardData) => {
    try {
      await deleteCard(cardData._id);
      toast.success(`Deleted card ${cardData.title}`);
      mutate(INBOX);
    } catch (e) {
      toast.error(`Failed to delete card ${cardData.title}`);
    }
  };

  const menuClickHandlers = {
    onDraw: (id) => {
      // Find card data from id
      const card = data.find(c => c._id === id);
      if (card) handleDraw(card);
    },
    // Shake doesn't apply to specific cards in inbox usually, or maybe it does? 
    // For now, let's map 'onDraw' to 'Edit/View'.
    // BoxCard expects onDraw to take an ID.
    onDelete: (data) => handleDelete(data)
  };

  return (
    <div className="flex gap-x-8 gap-y-8 items-start flex-wrap mt-4">
      {data?.length === 0 && <p className="text-gray-500">Inbox is empty.</p>}
      {data?.map((item) => (
        <InboxCard
          key={`inbox-card-item-${item?._id}`}
          name={item?.title || 'Untitled'}
          data={item}
          onMenuClicks={{
            onEdit: () => handleDraw(item),
            onDelete: () => handleDelete(item)
          }}
        />
      ))}
      <ModalGroup />
    </div>
  );
}

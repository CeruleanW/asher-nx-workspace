import { ALL_BOX, insertCard } from '@idea/features/idea-server';
import { Button } from '@root/shared/components/atomics/Button';
import { CenteredLoader } from '@root/shared/components/atomics/Loading';
import { Paper } from '@root/shared/components/atomics/Paper';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';
import { BoxSelector } from '../../../molecule/BoxSelector';
import { CardTitle } from '../../../molecule/CardTitle';
import { RichTextEditor } from './RichEditor';
import { useContentInLocalStorage, useEditor } from '../hooks';
import { isFilledArray } from '@root/shared/utils';
import { useSWRConfig } from 'swr';

type Box = {
  _id: string;
  name: string;
  [x: string]: any;
};

type OptionalsProps = {
  tags: Box[];
  title: string;
  [x: string]: any;
};

/**
 * Panel showing an Editor for editing a card
 */
export function EditorPanel({
  userID,
  ...optionals
}: { userID: string } & Partial<OptionalsProps>) {
  const { tags = [], title = '', ...rest } = optionals;
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => insertCard(data));
  const { editor, resetEditor, resetPoint } = useEditor();
  const { handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      boxes: tags,
      title,
    },
  });
  const { mutate } = useSWRConfig();

  // Local values
  const [contentValue, setContentValue, removeContent] =
    useContentInLocalStorage();
  const [titleValue, setTitleValue] = useState('');

  // Props
  // const boxOptions = tags.map((tag) => {
  //   return { value: tag._id, label: tag.name };
  // });

  const handleSave = (data) => {
    console.debug('Editor submit data', data);
    resetPoint()
    // inputs
    const content = contentValue;
    const title = titleValue;
    const owner = userID;
    const boxes = data?.boxes;

    const cardData = { content, title, owner, boxes };

    executeSave({ cardData })
      .then(() => {
        toast.success(`Added card ${title}`);
        // mutate boxes API if the card is added to at least one box
        if (isFilledArray(boxes)) {
          mutate(ALL_BOX);
        }

        handleDiscard();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Failed to add card ${title}`);
      });
  };

  const handleDiscard = () => {
    removeContent();
    setTitleValue('');
    resetEditor();
  };

  const handleSelectBoxChange = (options) => {
    const boxesValue = options.map((opt) => opt.value);
    console.debug('boxesValue', boxesValue);
    setValue('boxes', boxesValue);
  };

  if (saveState.loading) {
    return <CenteredLoader />;
  }

  return (
    <div className="mx-auto w-10/12 flex flex-col">
      <ErrorBoundary>
        <CardTitle
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <BoxSelector boxes={tags} onChange={handleSelectBoxChange} />
        <Paper className="w-full flex-grow">
          <ErrorBoundary>
            {editor ? <RichTextEditor
              value={contentValue}
              editor={editor}
              callbacks={{ setValue: setContentValue, remove: removeContent }}
            /> : null}
          </ErrorBoundary>
        </Paper>
        <div className="flex gap-x-4 mt-4 justify-start">
          <Button type="submit" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
          <Button onClick={handleDiscard} variant="outlined">
            Reset
          </Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

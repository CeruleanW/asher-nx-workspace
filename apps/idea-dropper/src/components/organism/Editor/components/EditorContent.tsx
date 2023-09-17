import React from 'react';
import { RichTextEditor } from './RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';
import { Button } from '@root/shared/components/atomics/Button';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { CardTitle } from '../../../molecule/CardTitle';
import { useAsyncFn } from 'react-use';
import { DEFAULT_CONTENT_VALUE } from '../constants';
import { useEditor } from '../hooks';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { CenteredLoader } from '@root/shared/components/atomics/Loading';
import { BoxSelector } from '../../../molecule/BoxSelector';
import { isFilledArray } from '@root/shared/utils';


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

const DEFAULT_FORM_VALUE = { title: '', content: DEFAULT_CONTENT_VALUE, boxes: [] }

/**
 * decouple editor state from local storage
 */
export function EditorContent({
  userID,
  onSubmit,
  ...optionals
}: { userID: string } & Partial<OptionalsProps>) {
  // Props
  const {
    defaultValues = DEFAULT_FORM_VALUE,
    tags = [],
    containerClassName = "mx-auto w-10/12 flex flex-col",
    ...rest
  } = optionals;
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => onSubmit(data));
  const {editor, resetEditor, resetPoint} = useEditor();
  const { handleSubmit, setValue, reset, control } = useForm({
    defaultValues,
  });

  // Handlers
  const handleSave = (data) => {
    console.debug('submit data', data);
    // compose inputs
    const content = data?.content;
    const title = data?.title;
    const owner = userID;
    const boxes = data?.boxes;
    const cardData = { content, title, owner, boxes };
    resetPoint()

    executeSave({ cardData })
      .then(() => {
        toast.success(`Updated card ${title}`);
        // mutate();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Failed to add card ${title}`);
      });
    handleDiscard();
  };

  const handleDiscard = () => {
    reset({title: '', content: DEFAULT_CONTENT_VALUE, boxes: []});
    resetEditor();
  };

  const handleSelectBoxChange = (options) => {
    if (!isFilledArray) return;
    const boxesValue = options.map((opt) => opt.value);
    // console.debug('boxesValue', boxesValue);
    setValue('boxes', boxesValue);
  };


  if (saveState.loading) {
    return <CenteredLoader />;
  }

  return (
    <div className={containerClassName}>
      <ErrorBoundary>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CardTitle
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
        <Controller name="boxes" control={control} render={({ field: { onChange, onBlur, value } }) => (
          <BoxSelector boxes={tags} onChange={handleSelectBoxChange} value={value} />
        )} />
        <Paper className="w-full flex-grow">
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RichTextEditor
                value={value}
                editor={editor}
                callbacks={{
                  setValue: (value) => {
                    console.debug('changed content value', value);
                    onChange(value);
                  },
                  remove: () => reset(),
                }}
              />
            )}
          />
        </Paper>
        <div className="flex gap-x-4 mt-4 justify-end">
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

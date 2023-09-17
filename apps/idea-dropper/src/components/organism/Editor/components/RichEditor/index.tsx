import isHotkey from 'is-hotkey';
import { useCallback } from 'react';
import { Editor } from 'slate';
import { Editable, Slate } from 'slate-react';
import { Toolbar } from '../Toolbar';
import { HOTKEYS } from './constants';
import {Leaf, Element} from './components';
// import { DEFAULT_CONTENT_VALUE, CONTENT_KEY } from '../../constants';
// import { useLocalStorage } from '@root/shared/features/local-storage';
// import { Button } from '@root/shared/components/atomics/Button';

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

/**
 *
 */
export const RichTextEditor = ({ value, editor, callbacks, ...optionals }) => {
  // Hooks
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // Props
  const { setValue, remove } = callbacks || {};

  const handleKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const handleChange = (value) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );
    if (isAstChange) {
      // Save the changed value
      setValue(value);
    }
  };

  return (
    <div
      className="relative"
      style={{ userSelect: 'none' }}
      contentEditable={false}
    >
      <Slate editor={editor} value={value as any} onChange={handleChange}>
        <Toolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write your ideas here…"
          spellCheck
          autoFocus
          onKeyDown={handleKeyDown}
          className={'p-4'}
        />
      </Slate>
    </div>
  );
};

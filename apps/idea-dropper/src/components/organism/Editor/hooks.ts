import { useLocalStorage } from '@root/shared/features/local-storage';
import { useRef } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { CONTENT_KEY, DEFAULT_CONTENT_VALUE, TITLE_KEY } from './constants';



export const useEditor = () => {
  const editorRef = useRef() as any;
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;

  const resetPoint = () => {
    const point = { path: [0, 0], offset: 0 };
    editor.selection = { anchor: point, focus: point }; // clean up selection
  }

  const resetEditorState = () => {
    resetPoint()
    editor.history = { redos: [], undos: [] }; // clean up history
    editor.children = DEFAULT_CONTENT_VALUE;
  }

  return {editor, resetEditor: resetEditorState, resetPoint};
};

/**
 * handle content in Editor
 * @return [contentValue, setContentValue, resetContent]
 */
export function useContentInLocalStorage(): [any, Function, Function,] {
  const queried = useLocalStorage(CONTENT_KEY, DEFAULT_CONTENT_VALUE) as [any, Function, Function];
  const resetContent = () => {
    queried[1](DEFAULT_CONTENT_VALUE);
  };
  queried[2] = resetContent;
  return queried;
}

export function useTitleInLocalStorage() {
  return useLocalStorage(TITLE_KEY, '');
}

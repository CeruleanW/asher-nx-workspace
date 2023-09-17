import React, { useState } from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
// Import the Slate editor factory.
import { createEditor, BaseEditor, Descendant } from 'slate';


type CustomElement = { type: 'paragraph'; children: any[] }
type CustomText = { text: string }

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Write something to your card.' }],
  },
] as Descendant[];

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export function BasicEditor(props) {
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <><Slate editor={editor} value={initialValue} ><Editable className='w-screen' /></Slate></>
  )
}

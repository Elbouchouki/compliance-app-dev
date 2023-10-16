"use client"


import { EditorState } from 'draft-js';
import { Editor as OriginalEditor } from "react-draft-wysiwyg"

const Editor = ({
  editorState,
  setEditorState
}: {
  editorState: EditorState,
  setEditorState: (value: EditorState) => void
}) => {

  return (
    <div className="p-2 border rounded-md">
      <OriginalEditor
        toolbarClassName='bg-card text-black border-0'
        editorClassName='border rounded-md p-2 text-md'
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
    </div>
  )
}
export default Editor
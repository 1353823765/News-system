import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function NewsEditor(props) {
const [editorState,seteditorState]=useState("")
useEffect(()=>{
  console.log(props.content)
  const html = props.content;
  if(html===undefined) return
  const contentBlock = htmlToDraft(html);
  
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    seteditorState(editorState)
  }
},[props.content])
  return (
    <div>
    <Editor
    editorState={editorState}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
    onEditorStateChange={(editorState)=>seteditorState(editorState)}
    onBlur={()=>{ 
props.getEditor(draftToHtml(convertToRaw(editorState.getCurrentContent())))

    }}
  />
 
  
    </div>
  )
}

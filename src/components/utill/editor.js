// WysiwygEditor.js

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
import { useRef } from "react";
import { Button } from "@mui/material";

const WysiwygEditor = ({ content = "<p></p>", setContent }) => {
  const editorRef = useRef(null);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"], // <-- 이미지 추가 툴바
    ["code"],
    ["scrollSync"]
  ];

  const showContent = () => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    // // const contentMark = editorIns.getMarkdown();
    setContent(contentHtml);
    // console.log(contentHtml);
    // console.log(contentMark);
  };

  const onChange = (event) => {
    const content = editorRef.current.getInstance();
    setContent(content.getHTML());
  };

  const handleSubmit = () => {
    const editor_instance = editorRef?.current?.getInstance();
    if (editor_instance) {
      // setEditor({
      //   html: editor_instance?.getHtml(),
      //   md: editor_instance?.getMarkdown()
      // });
      setContent(editor_instance?.getHtml());
    }
  };

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={content ? content : "<p></p>"} // 글 수정 시 사용
        hideModeSwitch={true}
        initialEditType="wysiwyg"
        height="300px"
        theme={""} // '' & 'dark'
        usageStatistics={false}
        toolbarItems={toolbarItems}
        onChange={onChange}
      />
    </>
  );
};

export default WysiwygEditor;

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// install @types/draft-js @types/react-draft-wysiwyg and @types/draft-js @types/react-draft-wysiwyg for types

const TextEditor = () => {
  return (
    <>
      <div className="container my-5">
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          placeholder=" 금 내역서 발향은 고객센터 (1811-6825)년 용하여 문의 바랍니다"
        />
      </div>
    </>
  );
};

export default TextEditor;

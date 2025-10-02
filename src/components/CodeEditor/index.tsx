import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as vscode from "@uiw/codemirror-theme-vscode";
import { EditorView } from "@codemirror/view";

const customTheme = EditorView.theme({
  "&": {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
  },
  ".cm-placeholder": {
    color: "#99a1af",
    fontFamily: "Pretendard",
    fontWeight: 400,
    marginLeft: "12px",
    marginTop: "6px",
  },
});
interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language: string; // value 값 사용
  editable?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  editable,
}) => {
  const langMap: { [key: string]: any } = {
    py: langs.py(),
    java: langs.java(),
    js: langs.js(),
    cpp: langs.cpp(),
    c: langs.c(),
    cs: langs.cs(),
    go: langs.go(),
    kt: langs.kt(),
    swift: langs.swift(),
    rs: langs.rs(),
  };

  const extension = langMap[language] || langs.py();

  return (
    <CodeMirror
      placeholder="코드를 입력하세요"
      value={value}
      minHeight="300px"
      extensions={[extension, customTheme]}
      onChange={(val) => onChange && onChange(val)}
      theme={vscode.vscodeDark}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        autocompletion: false,
        highlightActiveLine: false,
      }}
      editable={editable}
    />
  );
};

export default CodeEditor;

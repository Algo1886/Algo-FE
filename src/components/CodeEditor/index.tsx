// CodeEditor.tsx
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { bbedit } from "@uiw/codemirror-theme-bbedit";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language: string; // value 값 사용
  editable?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language, editable }) => {
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
    <div className="border border-gray-200">
      <CodeMirror
        placeholder="코드를 입력하세요"
        value={value}
        height="300px"
        extensions={[extension]}
        onChange={(val) => onChange && onChange(val)}
        theme={bbedit}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          autocompletion: false,
          highlightActiveLine: false,
        }}
        editable={editable}
      />
    </div>
  );
};

export default CodeEditor;
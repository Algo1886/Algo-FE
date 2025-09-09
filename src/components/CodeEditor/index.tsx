import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  language: string
  editable?: boolean
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language, editable }) => {
  let extension
  switch (language) {
    case "python":
      extension = langs.py()
      break
    case "java":
      extension = langs.java()
      break
    case "javascript":
      extension = langs.js()
      break
    default:
      extension = langs.py()
  }

  return (
    <div className="border border-gray-200">
    <CodeMirror
      placeholder="코드를 입력하세요"
      value={value}
      height="300px"
      extensions={[extension]}
      onChange={(val) => {onChange && onChange(val)}}
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

  )
}

export default CodeEditor
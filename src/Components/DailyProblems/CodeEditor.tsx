import Editor from "@monaco-editor/react"

interface CodeEditorPropsInterface {
    language: string,
    code: string,
    onChange: (value: string | undefined ) => void,
    isOpen: boolean
}

const CodeEditor: React.FC<CodeEditorPropsInterface> = (props: CodeEditorPropsInterface) => {
    return (
        <div className={`w-full border ${props.isOpen ? 'h-[350px]' : 'h-[500px]'} border-gray-300 rounded-lg overflow-hidden`}>
            <Editor 
            height={"100%"}
            defaultLanguage={props.language}
            language={props.language}
            value={props.code}
            onChange={props.onChange} 
            theme="vs-dark"
            className="scrollbar-thin"
            />
        </div>
    )
}

export default CodeEditor
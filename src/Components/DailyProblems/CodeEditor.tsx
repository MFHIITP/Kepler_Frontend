import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";

interface CodeEditorPropsInterface {
    language: string;
    code: string;
    onChange: (value: string | undefined) => void;
    isOpen: boolean;
}

const getLanguageIcon = (language: string) => {
    const icons = {
        javascript: "JS",
        typescript: "TS", 
        python: "PY",
        java: "JAVA",
        cpp: "C++",
        c: "C",
        csharp: "C#",
        html: "HTML",
        css: "CSS",
        json: "JSON",
        sql: "SQL",
        go: "GO",
        rust: "RS",
        php: "PHP",
        ruby: "RB"
    };
    return icons[language.toLowerCase()] || language.toUpperCase().slice(0, 3);
};

const getLanguageColor = (language: string) => {
    const colors = {
        javascript: "bg-yellow-500",
        typescript: "bg-blue-500",
        python: "bg-green-500", 
        java: "bg-orange-600",
        cpp: "bg-blue-600",
        c: "bg-gray-600",
        csharp: "bg-purple-600",
        html: "bg-orange-500",
        css: "bg-blue-400",
        json: "bg-gray-500",
        sql: "bg-teal-500",
        go: "bg-cyan-500",
        rust: "bg-orange-700",
        php: "bg-purple-500",
        ruby: "bg-red-500"
    };
    return colors[language.toLowerCase()] || "bg-slate-500";
};

const CodeEditor: React.FC<CodeEditorPropsInterface> = (props) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState("vs-dark");
    const [wordWrap, setWordWrap] = useState(false);
    const editorRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleFullscreen = () => {
        if (!isFullscreen && containerRef.current) {
            containerRef.current.requestFullscreen?.();
        } else if (isFullscreen) {
            document.exitFullscreen?.();
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleFontSizeChange = (increment: boolean) => {
        setFontSize(prev => {
            const newSize = increment ? prev + 1 : prev - 1;
            return Math.max(10, Math.min(24, newSize));
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.code).then(() => {
            toast.success("Copied");
        });
    };

    const formatCode = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`${
                isFullscreen 
                    ? 'fixed inset-0 z-50 h-screen' 
                    : `w-full ${props.isOpen ? 'h-[380px]' : 'h-[435px]'}`
            } bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col`}
        >
            {/* Header Bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-2 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Language Badge */}
                    <div className={`${getLanguageColor(props.language)} text-white px-2 py-1 rounded text-xs font-semibold`}>
                        {getLanguageIcon(props.language)}
                    </div>
                    
                    {/* File Info */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="hidden sm:inline">Code Editor</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between sm:justify-end space-x-1 sm:space-x-1">
                    {/* Font Size Controls */}
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                            onClick={() => handleFontSizeChange(false)}
                            className="px-1.5 sm:px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Decrease font size"
                        >
                            A-
                        </button>
                        <span className="px-1.5 sm:px-2 py-1 text-xs text-gray-700 bg-gray-50 border-x border-gray-300">
                            {fontSize}px
                        </span>
                        <button
                            onClick={() => handleFontSizeChange(true)}
                            className="px-1.5 sm:px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Increase font size"
                        >
                            A+
                        </button>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                        className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Toggle theme"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {theme === "vs-dark" ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            )}
                        </svg>
                    </button>

                    {/* Word Wrap Toggle */}
                    <button
                        onClick={() => setWordWrap(!wordWrap)}
                        className={`p-1 sm:p-1.5 rounded transition-colors ${
                            wordWrap 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title="Toggle word wrap"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>

                    {/* Copy Button */}
                    <button
                        onClick={copyToClipboard}
                        className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Copy code"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>

                    {/* Format Button */}
                    <button
                        onClick={formatCode}
                        className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Format code"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                    </button>

                    {/* Fullscreen Button */}
                    <button
                        onClick={handleFullscreen}
                        className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isFullscreen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9V4.5M15 9h4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15v4.5M15 15h4.5M15 15l5.5 5.5" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7V3h4M21 7V3h-4M21 17v4h-4M3 17v4h4" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Editor Container */}
            <div className="flex-1 relative bg-gray-900">
                <Editor
                    height="100%"
                    defaultLanguage={props.language}
                    language={props.language}
                    value={props.code}
                    onChange={props.onChange}
                    theme={theme}
                    onMount={(editor) => {
                        editorRef.current = editor;
                    }}
                    options={{
                        fontSize: fontSize,
                        fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        minimap: { enabled: isFullscreen },
                        wordWrap: wordWrap ? 'on' : 'off',
                        lineHeight: 1.6,
                        padding: { top: 16, bottom: 16 },
                        smoothScrolling: true,
                        cursorSmoothCaretAnimation: true,
                        renderLineHighlight: 'line',
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                            useShadows: false
                        },
                        suggest: {
                            showIcons: true,
                            showSnippets: true
                        },
                        quickSuggestions: true,
                        bracketPairColorization: {
                            enabled: true
                        }
                    }}
                />
            </div>

            {/* Footer Status Bar */}
            <div className="bg-gray-50 border-t border-gray-200 px-2 sm:px-4 py-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-xs text-gray-500">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <span>Lines: {props.code.split('\n').length}</span>
                    <span>Chars: {props.code.length}</span>
                    <span className="hidden sm:inline">Theme: {theme === 'vs-dark' ? 'Dark' : 'Light'}</span>
                </div>
                <div className="flex items-center space-x-2 sm:justify-end">
                    <span className={`w-2 h-2 rounded-full ${props.code ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                    <span>{props.code ? 'Ready' : 'Empty'}</span>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
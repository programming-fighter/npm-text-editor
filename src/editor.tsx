// src/Editor.tsx
import React, { useRef } from "react";
import { Toolbar } from "./toolbar.js";

interface EditorProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ placeholder, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
  };

  const handleInput = () => {
    const value = editorRef.current?.innerHTML || "";
    onChange?.(value);
  };

  return (
    <div className="border rounded-md">
      <Toolbar onCommand={handleCommand} />
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="p-2 min-h-[150px] outline-none"
        onInput={handleInput}
      >
        {placeholder}
      </div>
    </div>
  );
};

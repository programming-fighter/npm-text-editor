// src/Toolbar.tsx
import React from "react";

interface ToolbarProps {
  onCommand: (command: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
  return (
    <div className="flex gap-2 border-b p-2 bg-gray-50">
      <button onClick={() => onCommand("bold")}><b>B</b></button>
      <button onClick={() => onCommand("italic")}><i>I</i></button>
      <button onClick={() => onCommand("underline")}><u>U</u></button>
      <button onClick={() => onCommand("undo")}>Undo</button>
      <button onClick={() => onCommand("redo")}>Redo</button>
    </div>
  );
};

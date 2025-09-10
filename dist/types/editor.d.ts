import type React from "react";
export interface EditorProps {
    initialContent?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
}
export declare const Editor: React.FC<EditorProps>;

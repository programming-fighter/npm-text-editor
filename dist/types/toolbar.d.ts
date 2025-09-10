import type React from "react";
interface ToolbarProps {
    onCommand: (command: string, value?: string) => void;
}
export declare const Toolbar: React.FC<ToolbarProps>;
export {};

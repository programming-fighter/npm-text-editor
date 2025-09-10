import type React from "react";
interface LinkDialogProps {
    open: boolean;
    onClose: () => void;
    onInsert: (url: string, text?: string) => void;
}
export declare const LinkDialog: React.FC<LinkDialogProps>;
export {};

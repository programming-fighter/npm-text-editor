import type React from "react";
interface ImageDialogProps {
    open: boolean;
    onClose: () => void;
    onInsert: (src: string, alt: string) => void;
}
export declare const ImageDialog: React.FC<ImageDialogProps>;
export {};

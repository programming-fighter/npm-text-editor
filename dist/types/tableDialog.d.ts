import type React from "react";
interface TableDialogProps {
    open: boolean;
    onClose: () => void;
    onInsert: (rows: number, cols: number) => void;
}
export declare const TableDialog: React.FC<TableDialogProps>;
export {};

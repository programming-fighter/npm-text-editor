"use client"

import type React from "react"
import { useState } from "react"
import { Bold, Italic, Underline, Undo, Redo, LinkIcon, ImageIcon, Table, Code, Quote } from "lucide-react"
import { LinkDialog } from "./linkDialog"
import { ImageDialog } from "./ImageDialog"
import { TableDialog } from './tableDialog';

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void
}

export const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showTableDialog, setShowTableDialog] = useState(false)

  const handleLinkInsert = (url: string, text?: string) => {
    if (text) {
      // If text is provided, insert it first then create link
      onCommand("insertHTML", `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
    } else {
      // Create link from selected text
      onCommand("createLink", url)
    }
    setShowLinkDialog(false)
  }

  const handleImageInsert = (src: string, alt: string) => {
    onCommand("insertHTML", `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`)
    setShowImageDialog(false)
  }

  const handleTableInsert = (rows: number, cols: number) => {
    let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">'
    for (let i = 0; i < rows; i++) {
      tableHTML += "<tr>"
      for (let j = 0; j < cols; j++) {
        tableHTML += '<td style="border: 1px solid #ccc; padding: 8px; min-width: 50px;">&nbsp;</td>'
      }
      tableHTML += "</tr>"
    }
    tableHTML += "</table>"
    onCommand("insertHTML", tableHTML)
    setShowTableDialog(false)
  }

  const handleCodeBlock = () => {
    onCommand(
      "insertHTML",
      '<pre style="background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto;"><code>// Your code here</code></pre>',
    )
  }

  const handleInlineCode = () => {
    onCommand(
      "insertHTML",
      '<code style="background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace;">code</code>',
    )
  }

  const handleBlockquote = () => {
    onCommand("formatBlock", "blockquote")
  }

  return (
    <>
      <div className="flex flex-wrap gap-1 border-b border-border p-2 bg-muted/50">
        {/* Basic formatting */}
        <button  onClick={() => onCommand("bold")} title="Bold (Ctrl+B)">
          <Bold className="h-4 w-4" />
        </button>

        <button  onClick={() => onCommand("italic")} title="Italic (Ctrl+I)">
          <Italic className="h-4 w-4" />
        </button>

        <button  onClick={() => onCommand("underline")} title="Underline (Ctrl+U)">
          <Underline className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Undo/Redo */}
        <button  onClick={() => onCommand("undo")} title="Undo (Ctrl+Z)">
          <Undo className="h-4 w-4" />
        </button>

        <button  onClick={() => onCommand("redo")} title="Redo (Ctrl+Shift+Z)">
          <Redo className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Insert elements */}
        <button  onClick={() => setShowLinkDialog(true)} title="Insert Link">
          <LinkIcon className="h-4 w-4" />
        </button>

        <button  onClick={() => setShowImageDialog(true)} title="Insert Image">
          <ImageIcon className="h-4 w-4" />
        </button>

        <button  onClick={() => setShowTableDialog(true)} title="Insert Table">
          <Table className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Code and quote */}
        <button  onClick={handleCodeBlock} title="Code Block">
          <Code className="h-4 w-4" />
        </button>

        <button  onClick={handleInlineCode} title="Inline Code">
          <span className="text-xs font-mono">{`</>`}</span>
        </button>

        <button  onClick={handleBlockquote} title="Blockquote">
          <Quote className="h-4 w-4" />
        </button>
      </div>

      <LinkDialog open={showLinkDialog} onClose={() => setShowLinkDialog(false)} onInsert={handleLinkInsert} />

      <ImageDialog open={showImageDialog} onClose={() => setShowImageDialog(false)} onInsert={handleImageInsert} />

      <TableDialog open={showTableDialog} onClose={() => setShowTableDialog(false)} onInsert={handleTableInsert} />
    </>
  )
}

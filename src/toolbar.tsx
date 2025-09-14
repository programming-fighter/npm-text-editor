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
      onCommand("insertHTML", `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
    } else {
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

  // Divider style
  const dividerStyle: React.CSSProperties = {
    width: "1px",
    height: "24px",
    backgroundColor: "#d1d5db",
    margin: "0 4px",
  }

  // Button style
  const buttonStyle: React.CSSProperties = {
    border: "none",
    background: "transparent",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  // Toolbar container style
  const toolbarStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    borderBottom: "1px solid #da741bff",
    padding: "4px 8px",
    backgroundColor: "rgba(83, 239, 36, 0.5)", // muted/50
  }

  return (
    <>
      <div style={toolbarStyle}>
        {/* Basic formatting */}
        <button style={buttonStyle} onClick={() => onCommand("bold")} title="Bold (Ctrl+B)">
          <Bold style={{ width: "16px", height: "16px" }} />
        </button>

        <button style={buttonStyle} onClick={() => onCommand("italic")} title="Italic (Ctrl+I)">
          <Italic style={{ width: "16px", height: "16px" }} />
        </button>

        <button style={buttonStyle} onClick={() => onCommand("underline")} title="Underline (Ctrl+U)">
          <Underline style={{ width: "16px", height: "16px" }} />
        </button>

        <div style={dividerStyle} />

        {/* Undo/Redo */}
        <button style={buttonStyle} onClick={() => onCommand("undo")} title="Undo (Ctrl+Z)">
          <Undo style={{ width: "16px", height: "16px" }} />
        </button>

        <button style={buttonStyle} onClick={() => onCommand("redo")} title="Redo (Ctrl+Shift+Z)">
          <Redo style={{ width: "16px", height: "16px" }} />
        </button>

        <div style={dividerStyle} />

        {/* Insert elements */}
        <button style={buttonStyle} onClick={() => setShowLinkDialog(true)} title="Insert Link">
          <LinkIcon style={{ width: "16px", height: "16px" }} />
        </button>

        <button style={buttonStyle} onClick={() => setShowImageDialog(true)} title="Insert Image">
          <ImageIcon style={{ width: "16px", height: "16px" }} />
        </button>

        <button style={buttonStyle} onClick={() => setShowTableDialog(true)} title="Insert Table">
          <Table style={{ width: "16px", height: "16px" }} />
        </button>

        <div style={dividerStyle} />

        {/* Code and quote */}
        <button style={buttonStyle} onClick={handleCodeBlock} title="Code Block">
          <Code style={{ width: "16px", height: "16px" }} />
        </button>

        <button style={buttonStyle} onClick={handleInlineCode} title="Inline Code">
          <span style={{ fontSize: "10px", fontFamily: "monospace" }}>{`</>`}</span>
        </button>

        <button style={buttonStyle} onClick={handleBlockquote} title="Blockquote">
          <Quote style={{ width: "16px", height: "16px" }} />
        </button>
      </div>

      <LinkDialog open={showLinkDialog} onClose={() => setShowLinkDialog(false)} onInsert={handleLinkInsert} />

      <ImageDialog open={showImageDialog} onClose={() => setShowImageDialog(false)} onInsert={handleImageInsert} />

      <TableDialog open={showTableDialog} onClose={() => setShowTableDialog(false)} onInsert={handleTableInsert} />
    </>
  )
}

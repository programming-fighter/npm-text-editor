
import type React from "react"
import { useState } from "react"

interface TableDialogProps {
  open: boolean
  onClose: () => void
  onInsert: (rows: number, cols: number) => void
}

export const TableDialog: React.FC<TableDialogProps> = ({ open, onClose, onInsert }) => {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rows > 0 && cols > 0) {
      onInsert(rows, cols)
      setRows(3)
      setCols(3)
    }
  }

  const handleClose = () => {
    setRows(3)
    setCols(3)
    onClose()
  }
   if (!open) return null
  return (
    <div  onChange={handleClose}>
      <div className="sm:max-w-md">
        <div>
          <h3>Insert Table</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rows">Rows</label>
            <input
              id="rows"
              type="number"
              min="1"
              max="20"
              value={rows}
              onChange={(e) => setRows(Number.parseInt(e.target.value) || 1)}
              required
            />
          </div>
          <div>
            <label htmlFor="cols">Columns</label>
            <input
              id="cols"
              type="number"
              min="1"
              max="10"
              value={cols}
              onChange={(e) => setCols(Number.parseInt(e.target.value) || 1)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button"  onClick={handleClose}>
              Cancel
            </button>
            <button type="submit">Insert Table</button>
          </div>
        </form>
      </div>
    </div>
  )
}

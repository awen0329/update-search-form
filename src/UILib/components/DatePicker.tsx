import React, { useState } from "react"
import { format } from "date-fns"
import { Box, Calendar, Input, Popover, Combobox, Typography } from "../../UILib"

interface InputDateProps {
  label: string
  name: string
  value: Date
  onChange: (date: Date) => void
  error?: any
}

const InputDate: React.FC<InputDateProps> = ({ label, name, value, onChange, error }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(true)
    setAnchorEl(e.currentTarget)
  }

  return (
    <Box>
      <Typography.Label sx={{ mb: "2px" }}>{label}</Typography.Label>
      <Box height={32} maxWidth={100}>
        <Input
          type="text"
          name={name}
          disableUnderline
          value={format(value, "MM/dd/yyyy")}
          readOnly
          onClick={handleOpen}
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "info.main",
            border: "1px solid",
            borderColor: error ? "error.main" : "divider",
            borderRadius: "6px",
            p: 0,
            "& input": {
              p: "8px 10px",
              height: "16px",
              lineHeight: "32px",
            },
          }}
        />
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              boxShadow: "none",
              bgcolor: "transparent",
            },
          }}
        >
          <Combobox>
            <Calendar
              value={value}
              onChange={(date) => {
                onChange(date)
              }}
              onlyFutureDay
            />
          </Combobox>
        </Popover>
      </Box>
      {error && <Typography.Label color="error">{error}</Typography.Label>}
    </Box>
  )
}

export default InputDate

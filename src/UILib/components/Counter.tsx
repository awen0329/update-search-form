import React from "react"

import { Box, Button, Input, Typography } from "../../UILib"

interface CounterProps {
  label: string
  name: string
  value: number
  // eslint-disable-next-line no-unused-vars
  onChange: (count: number) => void
  error?: any
}

const Counter: React.FC<CounterProps> = ({ label, name, value, onChange, error }) => {
  const handleDown = () => {
    onChange(Math.max(value - 1, 0))
  }

  const handleUp = () => {
    onChange(value + 1)
  }

  return (
    <Box>
      <Typography.Label sx={{ mb: "2px" }}>{label}</Typography.Label>
      <Box
        sx={{
          maxWidth: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "10px",
          height: "32px",
          border: "1px solid",
          borderColor: error ? "error.main" : "divider",
          borderRadius: "6px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            minWidth: "22px",
            height: "22px",
            borderRadius: "4px",
            color: "background.default",
            fontSize: "20px",
            p: 0,
          }}
          onClick={handleDown}
        >
          -
        </Button>
        <Input
          value={value}
          name={name}
          readOnly
          disableUnderline
          sx={{ fontSize: "12px", lineHeight: "16px", "& input": { textAlign: "center" } }}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            minWidth: "22px",
            height: "22px",
            borderRadius: "4px",
            color: "background.default",
            p: 0,
            fontSize: "20px",
          }}
          onClick={handleUp}
        >
          +
        </Button>
      </Box>
      {error && <Typography.Label color="error">{error}</Typography.Label>}
    </Box>
  )
}

export default Counter

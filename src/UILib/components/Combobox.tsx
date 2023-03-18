import React, { PropsWithChildren } from "react"
import { SxProps, useTheme } from "@mui/material"
import { Paper } from "../"

const Combobox: React.FC<PropsWithChildren<{ sx?: SxProps }>> = ({ children, sx }) => {
  const theme = useTheme()

  return (
    <Paper
      sx={{
        mt: 1,
        border: "1px solid",
        borderColor: "primary.main",
        position: "relative",
        borderRadius: "8px",
        "&:before": {
          md: {
            content: "''",
            display: "block",
            position: "absolute",
            left: "5%",
            width: 0,
            height: 0,
            borderStyle: "solid",
            top: -16,
            borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
            borderWidth: "8px",
          },
        },
        ...sx
      }}
    >
      {children}
    </Paper>
  )
}

export default Combobox

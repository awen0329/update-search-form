import { useTheme } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { Typography } from "."

const Indicator: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const theme = useTheme()
  return (
    <Typography.Label
      sx={{
        position: "relative",
        height: "24px",
        minWidth: "94px",
        maxWidth: "124px",
        lineHeight: "24px",
        fontSize: "14px",
        fontWeight: 500,
        color: "primary.dark",
        textAlign: "center",
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: "8px",
        mt: 1,
        "&:before": {
          content: "''",
          display: "block",
          position: "absolute",
          height: 0,
          width: 0,
          right: "-12px",
          top: "27%",
          borderStyle: "solid",
          borderColor: `transparent transparent transparent ${theme.palette.primary.dark}`,
          borderWidth: "6px",
        },
        "&:after": {
          content: "''",
          display: "block",
          position: "absolute",
          height: 0,
          width: 0,
          right: "-11px",
          top: "27%",
          borderStyle: "solid",
          borderColor: `transparent transparent transparent ${theme.palette.background.default}`,
          borderWidth: "6px",
        },
      }}
    >
      {children}
    </Typography.Label>
  )
}

export default Indicator

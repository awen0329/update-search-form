import React from "react"
import { Typography, TypographyProps } from "@mui/material"

const Variants = (styles: TypographyProps) => {
  const TextComponent = ({ children, ...restProps }: TypographyProps) =>
  (<Typography {...styles} {...restProps}>
    {children}
  </Typography>)

  return TextComponent
}

const CustomTypography = {
  Label: Variants({
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
  }),
}

export default CustomTypography

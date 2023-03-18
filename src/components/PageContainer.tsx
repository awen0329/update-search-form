import React from "react"

import { Box } from "../UILib"
import { gradientBGCSS } from "../constants"

const PageContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
      <Box
        p={4}
        display="flex"
        maxWidth={1200}
        maxHeight={584}
        width="100%"
        height="100vh"
        sx={{
          background: gradientBGCSS,
          filter: "blur(150px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          overflow: "auto",
          overflowX: "hidden",
          p: { md: "90px 86px 38px 86px", xs: "50px 14px" },
          minWidth: { md: "734px", xs: "370px" },
          maxHeight: "calc(100vh - 100px)",
          bgcolor: "background.default",
          borderRadius: "16px",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageContainer

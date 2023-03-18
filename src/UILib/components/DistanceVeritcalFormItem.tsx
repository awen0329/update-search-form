import React, { PropsWithChildren } from "react"
import {
  Box,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  PosIcon,
  PathIcon,
} from ".."

interface DistanceVeritcalFormItemProps {
  end?: boolean
}

const DistanceVeritcalFormItem: React.FC<PropsWithChildren<DistanceVeritcalFormItemProps>> = ({
  end,
  children,
}) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            p: "4px 0 4px 1px",
            m: 0,
            border: "none",
            boxShadow: "none",
            bgcolor: "transparent",
          }}
        >
          <Box
            component="img"
            src={end ? PosIcon : PathIcon}
            sx={{ width: "12px" }}
          />
        </TimelineDot>
        {!end && (
          <TimelineConnector
            sx={{
              width: 0,
              display: "block",
              bgcolor: "transparent",
              borderWidth: "2px",
              borderStyle: "dashed",
              borderColor: "transparent",
              borderRightColor: "info.main",
            }}
          />
        )}
      </TimelineSeparator>
      <TimelineContent sx={{ p: "0 0 0 48px", mt: -3 }}>{children}</TimelineContent>
    </TimelineItem>
  )
}

export default DistanceVeritcalFormItem

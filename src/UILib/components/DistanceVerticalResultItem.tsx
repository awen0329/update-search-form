import React from "react"
import {
  Box,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  PosIcon,
  PathIcon,
  TimelineOppositeContent,
} from "../../UILib"

interface ResultLineItemProps {
  left: React.ReactNode
  right: React.ReactNode
  end?: boolean
}

const ResultLineItem: React.FC<ResultLineItemProps> = ({ end, left, right }) => {
  return (
    <TimelineItem sx={{ minHeight: "35px" }}>
      <TimelineOppositeContent
        sx={{ mt: -3.5, p: 0, pr: 1, display: "flex", justifyContent: "flex-end" }}
      >
        {left}
      </TimelineOppositeContent>
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
      <TimelineContent>{right}</TimelineContent>
    </TimelineItem>
  )
}

export default ResultLineItem

import React, { useState, useEffect } from "react"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Box,
  Button,
  MenuItem,
  Popover,
  Combobox,
  TriangleIcon,
  Typography,
  MenuList,
} from "../../UILib"
import { daysPerCalendarPage, getYear, getDate, getMonth } from "../../utils"
import { months as MONTH_NAME, weekdays as WEEK_DAYS } from "../../constants"

interface CalendarProps {
  value: Date
  // eslint-disable-next-line no-unused-vars
  onChange: (date: Date) => void
  onlyFutureDay?: boolean
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange, onlyFutureDay }) => {
  const [year, setYear] = useState<number>(() => getYear(value))
  const [month, setMonth] = useState<number>(() => getMonth(value))

  const [yearSelectOpen, setYearSelectOpen] = useState<boolean>()
  const [monthSelectOpen, setMonthSelectOpen] = useState<boolean>()

  const [days, setDays] = useState(
    daysPerCalendarPage(getMonth(value), getYear(value))
  )

  const [anchorYearEl, setAnchorYearEl] = React.useState<null | HTMLElement>(null)
  const [anchorMonthEl, setAnchorMonthEl] = React.useState<null | HTMLElement>(null)

  const handleYearSelectClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorYearEl(event.currentTarget)
    setYearSelectOpen((previousOpen) => !previousOpen)
  }

  const handleSelectYear = (value: number) => {
    setYearSelectOpen(false)
    setYear(value)
  }

  const handleMonthSelectClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMonthEl(event.currentTarget)
    setMonthSelectOpen((previousOpen) => !previousOpen)
  }

  const handleSelectMonth = (value: number) => {
    setMonthSelectOpen(false)
    setMonth(value)
  }

  const handleDaySelect = (day: number) => {
    onChange(new Date(`${year}-${month + 1}-${day}`))
  }

  const handleBeforeCalendar = () => {
    if (month === 0) {
      setMonth(11)
      setYear((year) => year - 1)
    } else {
      setMonth((month) => month - 1)
    }
  }

  const handleNextCalendar = () => {
    if (month === 11) {
      setMonth(0)
      setYear((year) => year + 1)
    } else {
      setMonth((month) => month + 1)
    }
  }

  const isEqualDate = (value: Date, date: number, type: string) => {
    return (
      getDate(value) === date &&
      getMonth(value) === month &&
      getYear(value) === year &&
      type === "current"
    )
  }

  const isFutureDate = (date: number) => {
    return onlyFutureDay ? new Date(`${year}-${month + 1}-${date}`) > new Date() : true
  }

  useEffect(() => {
    setDays(daysPerCalendarPage(month, year))
  }, [year, month])

  return (
    <Box width={221}>
      <Box display="flex" justifyContent="space-between" pt={2} px={2.5}>
        <Box
          component="img"
          src={ArrowLeftIcon}
          onClick={handleBeforeCalendar}
          sx={{ "&:hover": { cursor: "pointer" } }}
        />
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              display: "flex",
              alignItems: "end",
              border: "1px solid",
              borderColor: "divider",
              fontSize: "14px",
              lineHeight: "20px",
              width: "54px",
            }}
            onClick={handleMonthSelectClick}
          >
            {Object.keys(MONTH_NAME)[month]}
            <Box component="img" src={TriangleIcon} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              display: "flex",
              alignItems: "end",
              border: "1px solid",
              borderColor: "divider",
              fontSize: "14px",
              lineHeight: "20px",
              width: "54px",
            }}
            onClick={handleYearSelectClick}
          >
            {year}
            <Box component="img" src={TriangleIcon} />
          </Button>
        </Box>
        <Box
          component="img"
          src={ArrowRightIcon}
          onClick={handleNextCalendar}
          sx={{ "&:hover": { cursor: "pointer" } }}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" px={1.25} py={0.5}>
        {WEEK_DAYS.map((day) => (
          <Typography.Label
            key={day}
            sx={{ fontWeight: 700, fontSize: "18px", lineHeight: "28px", minWidth: "28px" }}
          >
            {day}
          </Typography.Label>
        ))}
        {days.map(({ type, date }) => (
          <Button
            key={`${type}-${date}`}
            variant="text"
            disabled={type !== "current" || !isFutureDate(date)}
            onClick={() => handleDaySelect(date)}
            sx={{
              fontSize: "14px",
              borderRadius: "28px",
              p: 0,
              minWidth: "28px",
              color: "info.main",
              bgcolor: isEqualDate(value, date, type) ? "primary.main" : "transparent",
            }}
          >
            {date}
          </Button>
        ))}
      </Box>
      <Popover
        open={!!yearSelectOpen}
        anchorEl={anchorYearEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => setYearSelectOpen(false)}
        PaperProps={{
          sx: {
            boxShadow: "none",
            bgcolor: "transparent",
          },
        }}
      >
        <Combobox>
          <MenuList autoFocus>
            {Array.from({ length: 10 }).map((_, index) => (
              <MenuItem
                key={`year-${year + index - 5}`}
                sx={{
                  py: 0,
                  minHeight: 0,
                }}
                onClick={() => handleSelectYear(year + index - 5)}
              >
                {year + index - 5}
              </MenuItem>
            ))}
          </MenuList>
        </Combobox>
      </Popover>
      <Popover
        open={!!monthSelectOpen}
        anchorEl={anchorMonthEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => setMonthSelectOpen(false)}
        PaperProps={{
          sx: {
            boxShadow: "none",
            bgcolor: "transparent",
          },
        }}
      >
        <Combobox>
          <MenuList autoFocus>
            {Object.keys(MONTH_NAME).map((monthName) => (
              <MenuItem
                key={monthName}
                sx={{
                  py: 0,
                  minHeight: 0,
                }}
                onClick={() => handleSelectMonth(MONTH_NAME[monthName])}
              >
                {monthName}
              </MenuItem>
            ))}
          </MenuList>
        </Combobox>
      </Popover>
    </Box>
  )
}

export default Calendar

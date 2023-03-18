import React, { useState, useEffect, ChangeEvent, useCallback, KeyboardEvent } from "react"
import {
  Box,
  CloseIcon,
  Combobox,
  Input,
  Popover,
  Skeleton,
  Typography,
} from "../../UILib"
import { getCities } from "../../mocks/api"

interface AsyncAutocompleteProps {
  error?: any
  label: string
  name: string
  removable?: boolean
  value: string
  onChange: (city: string) => void
  onRemove?: () => void
}

const AsyncAutocomplete: React.FC<AsyncAutocompleteProps> = ({
  label,
  value,
  name,
  onChange,
  error,
  removable,
  onRemove,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null)
  const [searchKey, setSearchKey] = useState<string>(value)
  const [data, setData] = useState<Array<[string, number, number]>>([])
  const [errorMsg, setErrorMsg] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [activeId, setActiveId] = useState<number>(-1)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getCities(searchKey)
      setErrorMsg("")
      setData(data as [string, number, number][])
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setErrorMsg("Oops! Failed to search with this keyword.")
    }
  }, [searchKey])

  useEffect(() => {
    if (searchKey) {
      fetchData()
    }
  }, [searchKey, fetchData])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnchorEl(e.currentTarget)
    setSearchKey(e.target.value)
    if (e.target.value) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveId(id => Math.min(id + 1, data.length - 1))
    } else if (e.key === "ArrowUp") {
      setActiveId(id => Math.max(id - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (data.length > 0 && activeId > -1 && data[activeId]) {
        onChange(data[activeId][0])
        setSearchKey(data[activeId][0])
        setOpen(false)
      }
    }
  }

  const handleSelect = (value: [string, number, number]) => {
    onChange(value[0])
    setSearchKey(value[0])
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    onChange("")
    setErrorMsg("")
    setData([])
    setSearchKey("")
  }

  return (
    <Box data-testid="async-autocomplete">
      <Typography.Label sx={{ mb: "2px" }}>{label}</Typography.Label>
      <Box display="flex" mr={removable ? -3.5 : 0}>
        <Input
          name={name}
          type="search"
          fullWidth
          value={searchKey}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disableUnderline
          sx={{
            border: "1px solid",
            borderColor: error || errorMsg ? "error.main" : "divider",
            borderRadius: "6px",
            p: 0,
            "& input": {
              p: "8px 10px",
              height: "16px",
              lineHeight: "32px",
              fontSize: "14px",
              color: "info.main"
            },
          }}
        />
        {removable && (
          <Box
            data-testid="remove-field-icon"
            component="img"
            src={CloseIcon}
            sx={{ ml: 2, "&:hover": { cursor: "pointer" } }}
            onClick={() => removable && onRemove && onRemove()}
          />
        )}
      </Box>
      <Popover
        open={open}
        onClose={handleClose}
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
        disableAutoFocus
      >
        <Combobox sx={{ p: "12px 6px", minWidth: anchorEl?.clientWidth }}>
          {isLoading ? (
            <Box px={1.5}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={`skeleton-${index}`}
                  width={anchorEl?.clientWidth}
                  height={32}
                  sx={{
                    borderRadius: "4px",
                    bgcolor: "divider",
                  }}
                />
              ))}
            </Box>
          ) :
            data.length > 0 && !error && !errorMsg ? (
              data.map((d, index) => (
                <Typography.Label
                  key={d[0]}
                  onClick={() => handleSelect(d)}
                  sx={{
                    lineHeight: "28px",
                    px: "6px",
                    bgcolor: activeId === index ? "primary.main" : "inherit",
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor: "primary.main",
                      borderRadius: "6px",
                    },
                  }}
                >
                  {d[0]}
                </Typography.Label>
              ))
            ) : (
              <Typography.Label>
                No Available City
              </Typography.Label>
            )}
        </Combobox>
      </Popover>
      {(error || errorMsg) && <Typography.Label color="error">{error || errorMsg}</Typography.Label>}
    </Box>
  )
}

export default AsyncAutocomplete

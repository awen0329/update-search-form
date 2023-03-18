import React, { useEffect } from "react"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useSearchParams } from "react-router-dom"
import * as Yup from "yup"
import { format } from "date-fns"
import {
  AsyncAutocomplete,
  Box,
  Button,
  Counter,
  DatePicker,
  DistanceVeritcalFormItem,
  Typography,
  Timeline as DistanceLine,
  timelineItemClasses,
  Form,
  PlusIcon,
} from "../UILib"
import PageContainer from "../components/PageContainer"

import { Validator } from "../utils"
import { DestinationFieldValue } from "../models"

const validationSchema = Yup.object().shape({
  origin: Validator.originSchema(),
  passengers: Validator.counterSchema(),
  destinations: Validator.destinationSchema(),
})

const Search = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      origin: searchParams.get("origin") || "",
      destinations: searchParams.getAll("destinations").length > 0 ? searchParams.getAll("destinations").map(city => ({ city })) : [{ city: "" }] as DestinationFieldValue[],
      passengers: searchParams.get("passengers") ? Number(searchParams.get("passengers")) : 1,
      date: searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date(),
    },
    mode: "all",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "destinations",
  })

  const onSubmit = () => {
    navigate(`/result?${searchParams.toString()}`)
  }

  const handleAddDestination = () => {
    append({ city: "" })
  }

  const handleRemoveDestination = (index: number) => {
    remove(index)
  }

  const formValues = watch()
  useEffect(() => {
    searchParams.set("origin", formValues.origin)
    searchParams.delete("destinations")
    formValues.destinations
      .map(({ city }) => city)
      .forEach((destination) => searchParams.append("destinations", destination))
    searchParams.set("date", format(new Date(formValues.date), "yyyy-MM-dd"))
    searchParams.set("passengers", formValues.passengers.toString())
    setSearchParams(searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)])

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            maxWidth: "387px",
            pr: "3px",
          }}
        >
          <DistanceLine
            sx={{
              p: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            <DistanceVeritcalFormItem>
              <Controller
                name="origin"
                control={control}
                render={({ field: { value, name, onChange }, fieldState: { error } }) => (
                  <AsyncAutocomplete
                    name={name}
                    value={value}
                    onChange={onChange}
                    label="City of origin"
                    error={error?.message}
                  />
                )}
              />
            </DistanceVeritcalFormItem>
            {fields.map(({ id }, index) => (
              <DistanceVeritcalFormItem key={id} end={index === fields.length - 1}>
                <Controller
                  name={`destinations.${index}.city`}
                  control={control}
                  render={({ field: { value, name, onChange }, fieldState: { error } }) => (
                    <AsyncAutocomplete
                      name={name}
                      value={value}
                      onChange={onChange}
                      label="City of destination"
                      removable={fields.length > 1}
                      onRemove={() => handleRemoveDestination(index)}
                      error={error?.message}
                    />
                  )}
                />
              </DistanceVeritcalFormItem>
            ))}
          </DistanceLine>
          <Box sx={{ mt: -3, display: "flex" }}>
            <Box
              component="img"
              src={PlusIcon}
              alt="plus destination"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handleAddDestination}
            />
            <Typography.Label
              data-testid="add-destination"
              sx={{
                color: "primary.dark",
                ml: 6,
                "&:hover": { cursor: "pointer" },
              }}
              onClick={handleAddDestination}
            >
              Add destination
            </Typography.Label>
          </Box>
        </Box>
        <Box
          sx={{
            mt: { md: 0, xs: 5.5 },
            pl: "60px",
            pr: "3px",
            display: { md: "block", xs: "flex" },
            gap: "24px",
            justifyContent: "space-between",
          }}
        >
          <Box mb={2.5}>
            <Controller
              name="passengers"
              control={control}
              render={({ field: { value, name, onChange }, fieldState: { error } }) => (
                <Counter
                  name={name}
                  label="Passengers"
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </Box>
          <Controller
            name="date"
            control={control}
            render={({ field: { value, name, onChange } }) => (
              <DatePicker label="Date" name={name} value={value} onChange={onChange} />
            )}
          />
        </Box>
        <Box
          sx={{ width: "100%", mt: { md: 4.5, xs: 6 }, display: "flex", justifyContent: "center" }}
        >
          <Button
            data-testid="submit-button"
            variant="contained"
            disableElevation
            disabled={!isValid}
            type="submit"
            sx={{
              flex: "none",
              p: "9px 12px",
              fontSize: "14px",
              lineHeight: "20px",
              borders: "4px",
              bgcolor: "info.main",
              color: "background.default",
              width: { md: "72px", xs: "100%" },
              textTransform: "initial",
              "&.Mui-disabled": {
                bgcolor: "divider",
                color: "background.default",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Form>
    </PageContainer>
  )
}

export default Search

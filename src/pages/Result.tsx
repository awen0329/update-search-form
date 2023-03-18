import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { format } from "date-fns"
import { Box, Button, Indicator, Skeleton, Timeline as DistanceLine, Typography, DistanceVerticalResultItem } from "../UILib"
import PageContainer from "../components/PageContainer"
import { getDistance } from "../mocks/api"

const Result = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [distances, setDistances] = useState<number[]>([])
  const [total, setTotal] = useState<number>(0)
  const [error, setError] = useState<string>()

  const date = searchParams.get("date")
  const passengers = searchParams.get("passengers")

  useEffect(() => {
    const fetchDistances = async (origin: string, destinations: string[]) => {
      try {
        setLoading(true)
        const { distances, total } = await getDistance(origin, destinations)
        setError("")
        setDistances(distances)
        setTotal(total)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setError("Oops! Something went wrong!")
      }
    }

    const origin = searchParams.get("origin")
    const destinations = searchParams.getAll("destinations")
    if (origin && destinations.length > 0) {
      fetchDistances(origin, destinations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <PageContainer>
      {error || !searchParams.get("origin") ? (
        <Typography.Label sx={{ fontWeight: 700, color: "primary.dark", textAlign: "center" }}>
          {error || "Origin should be set"}
        </Typography.Label>
      ) : isLoading ? (
        <>
          <Skeleton sx={{ width: { md: "560px", xs: "350px" }, height: "100px" }} />
          <Skeleton height="24px" width="300px" />
          <Skeleton height="24px" width="300px" />
          <Skeleton height="24px" width="300px" />
        </>
      ) : (
        <>
          {distances.length > 0 && (
            <DistanceLine>
              <DistanceVerticalResultItem
                right={<Typography.Label>{searchParams.get("origin")}</Typography.Label>}
                left={null}
              />
              {searchParams.getAll("destinations").map((destination, index) => (
                <DistanceVerticalResultItem
                  key={destination}
                  end={index === searchParams.getAll("destinations").length - 1}
                  right={<Typography.Label>{destination}</Typography.Label>}
                  left={<Indicator>{distances[index].toFixed(2)}km</Indicator>}
                />
              ))}
            </DistanceLine>
          )}
          <Typography.Label
            sx={{ fontWeight: 700, color: "primary.dark", textAlign: "center", mb: 1 }}
          >
            {total.toFixed(2)}km
            <Typography.Label sx={{ display: "inline" }}> is total distance</Typography.Label>
          </Typography.Label>
          <Typography.Label
            sx={{ fontWeight: 700, color: "primary.dark", textAlign: "center", mb: 1 }}
          >
            {passengers || 0}
            <Typography.Label sx={{ display: "inline" }}> passengers</Typography.Label>
          </Typography.Label>
          {date && (
            <Typography.Label sx={{ fontWeight: 700, color: "primary.dark", textAlign: "center" }}>
              {format(new Date(date), "MMM dd, yyyy")}
            </Typography.Label>
          )}
        </>
      )}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          disableElevation
          sx={{
            mt: 9,
            p: "9px 12px",
            fontSize: "14px",
            lineHeight: "20px",
            borders: "4px",
            bgcolor: "info.main",
            color: "background.default",
            width: { sm: "72px", xs: "100%" },
            textTransform: "initial",
          }}
          onClick={() => navigate("/search")}
        >
          Back
        </Button>
      </Box>
    </PageContainer>
  )
}

export default Result

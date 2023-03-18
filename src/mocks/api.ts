import { getHaversineDistance, mockDelay } from "../utils"
import mockData from "./data.json"

export async function getCities(searchKey: string) {
  await mockDelay(500)
  if (searchKey === "fail") {
    throw new Error("Server Error")
  } else {
    return mockData.filter((city) =>
      (city[0] as string).toLowerCase().includes(searchKey.toLowerCase())
    )
  }
}

export async function getDistance(origin: string, destinations: string[]) {
  const isIncludeDijon = origin === "Dijon" || destinations.find((point) => point === "Dijon")
  await mockDelay(500)
  if (isIncludeDijon) {
    throw new Error("Server Error")
  } else {
    const { distances, total } = destinations.reduce(
      ({ origin, distances, total }, destination) => {
        const originPoint = getPosByCity(origin)
        const destinationPoint = getPosByCity(destination)
        if (originPoint && destinationPoint) {
          const d = getHaversineDistance(originPoint, destinationPoint)
          distances.push(d)
          total += d
        } else {
          throw new Error("At least you need to add one origin and one destination.")
        }
        return { origin: destination, distances, total }
      },
      { origin, distances: [] as number[], total: 0 }
    )

    return { distances, total }
  }
}

function getPosByCity(city: string): [number, number] | null {
  const result = mockData.find((c) => c[0] === city)
  if (result) {
    return [result[1] as number, result[2] as number]
  }

  return null
}

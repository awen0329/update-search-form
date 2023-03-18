import * as Yup from "yup"

export const originSchema = () => Yup.string().required("You must choose the city of origin.")

export const destinationSchema = () =>
  Yup.lazy(() =>
    Yup.array().of(
      Yup.object({
        city: Yup.string().required("You must choose the city of destination."),
      })
    )
  )

export const counterSchema = () => Yup.number().min(1, "Select passengers.").required()

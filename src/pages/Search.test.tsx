/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import Search from "./Search"

describe("Search", () => {
  beforeEach(() => {
    render(<BrowserRouter><Search /></BrowserRouter>)
  })

  it("should render one origin field and one destination field at mount", async () => {
    expect(screen.getAllByTestId("async-autocomplete").length).toBe(2)
  })

  it("should render one origin field and two destination fields when click add button", async () => {
    const addButton = screen.getByTestId("add-destination")
    expect(addButton).toBeInTheDocument()

    await userEvent.click(addButton)

    expect(screen.getAllByTestId("async-autocomplete").length).toBe(3)
  })

  it("should remove one destination field when click remove button", async () => {
    const removeButtons = screen.getAllByTestId("remove-field-icon")
    expect(removeButtons.length).toBe(2)

    await userEvent.click(removeButtons[0])
    expect(screen.getAllByTestId("async-autocomplete").length).toBe(2)
  })
})
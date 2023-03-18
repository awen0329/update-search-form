import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import defaultTheme from "./themes/default"
import Search from "./pages/Search"
import Result from "./pages/Result"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

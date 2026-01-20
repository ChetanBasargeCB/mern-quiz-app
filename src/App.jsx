import { Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Login from "./Components/Login"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App

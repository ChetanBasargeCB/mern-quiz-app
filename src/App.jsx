import { Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Login from "./Components/Login"
import Resgister from "./Components/Resgister"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Resgister/>}/>
    </Routes>
    </>
  )
}

export default App

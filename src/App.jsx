import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import Login from "./Components/Login";
import Register from "./Components/Resgister"; // Ensure spelling matches your filename

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
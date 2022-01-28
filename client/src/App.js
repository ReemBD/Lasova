import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"

const App = () => {
  return (
    <Router>
      {/* headerCmp.. */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {/* footerCmp.. */}
    </Router>
  )
}

export default App

<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="top-container flex column">
        <Header />
        <div className="content-wrapper flex">
          <Sidebar />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
	return (
		<Router>
			<div className="top-container flex column">
				<Header />
				<div className="content-wrapper flex">
					<Sidebar />
					<main>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/" element={<Home />} />
						</Routes>
					</main>
				</div>
			</div>
		</Router>
	);
}

export default App;
>>>>>>> dd91f86f19d566427c792154a679eb2990fb9c7a

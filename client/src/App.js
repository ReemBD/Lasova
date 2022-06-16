import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import GroupsPage from './pages/GroupsPage';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { isAuthenticated } = useSelector((state) => state.groupReducer);
  return (
    <Router>
      <div className="top-container flex column">
        <div id="dropdown-root"></div>
        <Header />
        <div className="content-wrapper flex">
          <Sidebar />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/groups" element={<GroupsPage />} />
              {/* {isAuthenticated ? (
                <Route path="/groups" element={<GroupsPage />} />
              ) : (
                <Navigate to="/" replace />
              )}
              {isAuthenticated ? (
                <Route path="/" element={<Home />} />
              ) : (
                <Navigate to="/" replace />
              )} */}
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

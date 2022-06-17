import { useEffect } from 'react';
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
import { loadUser } from './store/actions/auth';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser(localStorage.user?.email));
    }
  }, []);

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
              <Route
                path="/groups"
                element={
                  isAuthenticated ? (
                    <GroupsPage />
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isAuthenticated ? <Home /> : <Navigate replace to="/login" />
                }
              />
              {/* <Route path="/groups" element={<GroupsPage />} /> */}
              {/* <Route path="/" element={<Home />} /> */}

              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

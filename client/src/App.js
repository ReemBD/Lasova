import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import GroupsPage from './pages/GroupsPage';
import VolunteerLiveReport from './pages/VolunteerLiveReport';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './store/actions/auth';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  
  //naama - need to check why only works with var, also why not getting back to login page when needed
  if (user && user.userType===0) {
    console.log("type:",user.userType)
    var isVolunteer = true;
  } else {
    var isVolunteer = false;
  }

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser(localStorage.user?.email));
    }
  }, []);


  //naama-for test only
  //let isMobile=true;

  return (
    <div className="top-container flex column">
  
      <div id="dropdown-root"></div>
      {/* <Header /> */}
   
      <div className="content-wrapper flex">
        {isAuthenticated && user && !isVolunteer ? <Sidebar /> : null}
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/groups" element={isAuthenticated ? (!isVolunteer ? <GroupsPage /> : <Navigate replace to="/report"/>) : <Navigate replace to="/login" />} />
            <Route path="/report" element={isVolunteer ? <VolunteerLiveReport /> : <Navigate replace to="/login" />} />
            <Route path="/" element={isAuthenticated ? (!isVolunteer ? <Home /> : <Navigate replace to="/report"/>) : <Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      {isVolunteer? null : <Footer />}
    </div>
  );
}

export default App;

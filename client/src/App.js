import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import GroupsPage from './pages/GroupsPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className='top-container flex column'>
        <div id="dropdown-root"></div>
        <Header />
        <div className='content-wrapper flex'>
          <Sidebar />
          <main>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/groups' element={<GroupsPage />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

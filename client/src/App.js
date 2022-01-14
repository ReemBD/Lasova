import React from "react";
import "./App.css";
import Login from "./components/Login";
<<<<<<< HEAD
import VolunteersTable from "./components/VolunteersTable";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import { Provider } from "react-redux";
import HeaderVT from "./components/HeaderVT";
import SidebarVT from "./components/SidebarVT";
import LogoLine from "./components/LogoLine";
=======
import React, { useState, useEffect } from "react";
>>>>>>> main


<<<<<<< HEAD
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <LogoLine />
        <div className="content">
          <div className="right_content">
            <SidebarVT />
          </div>
          <div className="left_content">
            <HeaderVT />
            <VolunteersTable />
          </div>
        </div>
      </Provider>
    </>
  );
};
=======
function App() {
  const [volunteers, setVolunteers] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();

      // store the data into our volunteers variable
      setVolunteers(data) ;
    }
  }, []); // <- you may need to put the setVolunteers function in this array

  return (
    <div>
      <Login />
    <h1>All existing users</h1>

    {/* display volunteers from localhost:8000 */}
    {volunteers && (
      <div className="volunteers">

        {/* loop over list of volunteers */}
        {volunteers.map((volunteer) => (
          <div className="single-volunteer">
            <h2>{volunteer.first_name} <br /> {volunteer.taz}</h2>
          </div>
        ))}

      </div>
    )}
  </div>
  )
}


// function readJson () {
//   console.log(this)
//   // http://localhost:8080
//   fetch('http://localhost:8000/users').then((response) => response.json()).then(json => {
//       vm.users = json
//       console.log(vm.users)
//   }).catch(function () {
//       vm.dataError = true
//   })
// }
>>>>>>> main

export default App;

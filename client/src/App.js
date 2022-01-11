import "./App.css";
import Login from "./components/Login";
import React, { useState } from "react";
import offline_data from "./mock-data.json";

/* <Login /> */

const App = () => {
  const [volunteers, setvolunteers] = useState(offline_data);
  return (
    <div className="basic-table-div">
      <div className="all-volunteers">
        {volunteers.map((volunteer) => (
          <div className="volunteer-view">
            {volunteer.first_name} {volunteer.last_name} <br />
            {volunteer.taz} <br />
            {readJson()}
            <br />
            {/* inside this div you can create a view of a single volunteer. 
          I didnt choose a tableview since im not sure whether Yulia would love another way
          displaying the information. :) */}
          </div>
        ))}
      </div>
    </div>
  );
};


function readJson () {
  console.log(this)
  // http://localhost:8080
  fetch('http://localhost:8000/users').then((response) => response.json()).then(json => {
      vm.users = json
      console.log(vm.users)
  }).catch(function () {
      vm.dataError = true
  })
}

export default App;

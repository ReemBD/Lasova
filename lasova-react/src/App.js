//import React, { useState } from "react";
import offline_data from './mock-data.json';
const React = require("react")
const { useState } = require("react")
//import "./App.css";

const App = () => {
  const [volunteers, setvolunteers] = useState(offline_data);
  return <div className="basic-table-div">
    <div className="person-row">
      {volunteers.map((volunteer) => (
        <h1>
          {volunteer.first_name} {volunteer.last_name}
        </h1>
      ))}
    </div>

  </div>
}

export default App;

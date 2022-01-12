import "./App.css";
import Login from "./components/Login";
import React, { useState, useEffect } from "react";


function App() {
  const [volunteers, setVolunteers] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();

      // store the data into our books variable
      setVolunteers(data) ;
    }
  }, []); // <- you may need to put the setBooks function in this array

  return (
    <div>
    <h1>Game of Thrones Books</h1>

    {/* display books from the API */}
    {volunteers && (
      <div className="volunteers">

        {/* loop over the books */}
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

export default App;

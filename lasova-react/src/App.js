import React, { useState } from "react"
import './App.css';
import offline_data from './mock-data.json';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


const app = () => {

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

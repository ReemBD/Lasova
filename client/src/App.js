import React from "react";
import "./App.css";
import Login from "./components/Login";
import VolunteersTable from "./components/VolunteersTable";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import { Provider } from "react-redux";

/* <Login /> */

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <VolunteersTable />
      </Provider>
    </>
  );
};

export default App;

import React from "react";
import "./App.css";
import Login from "./components/Login";
import VolunteersTable from "./components/VolunteersTable";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import { Provider } from "react-redux";
import HeaderVT from "./components/HeaderVT";
import SidebarVT from "./components/SidebarVT";
import LogoLine from "./components/LogoLine";

/* <Login /> */

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

export default App;
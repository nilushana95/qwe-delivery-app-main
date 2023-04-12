import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";

import { GlobalStorege } from "./contexts/GlobalContext";
import Header from "./components/Header";
import Extension from "./pages/Extension";

import "./sass/global.scss";

function App() {
  return (
    <div className="body_popup">
      <GlobalStorege>
        <Header />
        <Extension />
      </GlobalStorege>
    </div>
  );
}

export default App;

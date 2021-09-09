import React from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import SelectBar from "../components/SelectBar";

import "../sass/Extension.scss";
import SearchMode from "../patterns/SearchMode";
import FocusMode from "../patterns/FocusMode";

function Extension() {
  const global = React.useContext(GlobalContext);
  const btnSelect = [
    {
      id: "sMode",
      text: "search mode",
    },
    {
      id: "fMode",
      text: "focus mode",
    },
  ];

  return (
    <>
      <main className="container_extension">
        <SelectBar buttons={btnSelect} />
        <div className={`container ${global.nightMode ? "night_mode" : ""}`}>
          {global.typeMode === 0 && <SearchMode />}
          {global.typeMode === 1 && <FocusMode />}
        </div>
      </main>
    </>
  );
}

export default Extension;

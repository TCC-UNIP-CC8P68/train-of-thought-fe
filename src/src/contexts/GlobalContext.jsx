import React, { useEffect, useState } from 'react';
import { getSyncConfig } from "../utils/utilsFunction";
import { firstMaskValue } from "../utils/utilsMask";

export const GlobalContext = React.createContext();

export const GlobalStorege = ({ children }) => {
  const [nightMode, setNightMode] = React.useState(false);
  const [typeMode, setTypeMode] = React.useState(0);
  const [onConfig, setOnConfig] = React.useState(false);
  const [allowCapture, setAllowCapture] = useState(false);
  const [allowMute, setAllowMute] = useState(false);
  const [timeoutValue, setTime] = React.useState("");

  function handleNightMode() {
    setNightMode(!nightMode);
  }
  useEffect(() => {
    getSyncConfig().then(function (res) {
      setAllowCapture(res.allowCapture);
      setAllowMute(res.dontDisturb);
      setTime(firstMaskValue(res.timeoutValue));
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ nightMode, handleNightMode, typeMode, setTypeMode, onConfig, setOnConfig, setTime, timeoutValue, allowCapture, setAllowCapture, allowMute, setAllowMute }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

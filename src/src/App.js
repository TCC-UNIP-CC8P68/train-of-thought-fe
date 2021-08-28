import React, { useEffect, useState } from 'react';
import Plugin from './pages/plugin/index.jsx';
import './App.css';

function App() {
  /* eslint-disable no-undef */
  const [url, setUrl] = useState('');

  useEffect(() => {
    getCurrentTab().then(tab => {
      setUrl(tab.url);
    });

    document.getElementById("setTime").onclick = function() {  
      setTime();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <input type='text' id="time" placeholder='Tempo em segundos'/>
        <button id="setTime">Definir timeout</button>
        <p>URL:</p>
        <p>
          {url}
        </p>
      </header>
    </div> 
  );
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function setTime() {
  let time = document.querySelector("#time").value.trim();
  if(time == "" || isNaN(time)){
    console.log("valor timeout invalido");
  } else {
    let message = ["popup", time];
    chrome.runtime.sendMessage(message);
  }
}

export default App;

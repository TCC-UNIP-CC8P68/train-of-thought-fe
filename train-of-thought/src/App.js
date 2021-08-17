import React, { useEffect, useState } from 'react';
import Plugin from './pages/plugin/index.jsx';
import './App.css';

function App() {
  /* eslint-disable no-undef */
  const [url, setUrl] = useState('');

  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const url = tabs[0].url;
          setUrl(url);
      });

      chrome.runtime.sendMessage(
        1000,
        function (response) {
            console.log(response);
        }
      );

  }, []);

  return (
    <div className="App">
            <header className="App-header">
                <p>URL:</p>
                <p>
                    {url}
                </p>
            </header>
        </div>
  );
}
export default App;
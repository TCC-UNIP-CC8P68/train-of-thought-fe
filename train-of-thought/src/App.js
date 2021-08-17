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
                <button id="setTime">Click me</button>
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
    var time = document.querySelector("#time").value.trim();
    if(time == "" || isNaN(time)){
        alert("Defina o tempo em segundos!");
    } else {
        chrome.runtime.sendMessage(
            time,
            function (response) {
                console.log(response);
            }
        );
    }
}

export default App;
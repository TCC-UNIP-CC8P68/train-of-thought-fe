let analysisTimeout;
let timeoutValue = 5000;

chrome.tabs.onActivated.addListener(activeInfo => makeAnalysis());

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    makeAnalysis();
  }
});

function makeAnalysis(){
  clearTimeout(analysisTimeout);

  analysisTimeout = setTimeout(function(){
    getCurrentTab().then(tab => {
      let date = new Date();
      let momentOfCapture = date.getTime();
      console.log(momentOfCapture);
      if(tab) {
        console.log("URL Capturada: " + tab.url);
        console.log('Timeout: ' + timeoutValue);
        postCapturedUrl(tab.url, momentOfCapture);
      }
    });
  },timeoutValue);
}

async function postCapturedUrl(capturedUrl, momentOfCapture) {
  fetch('http://localhost:8084/capture', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "capturedUrl": capturedUrl,
      "momentOfCapture": momentOfCapture
    })
  });
}

async function postConfiguration(setBy, timeoutValue) {
  fetch('http://localhost:8084/configuration', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "setBy": setBy,
      "timeoutValue": timeoutValue
    })
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(
  function(request) {
    setBy = request[0];
    timeoutValue = request[1];
    postConfiguration(setBy, timeoutValue);
    timeoutValue *= 1000;

    console.log('Valor do timeout definido para: ' + timeoutValue + " ms definido via: " + request[0]);
  }
);

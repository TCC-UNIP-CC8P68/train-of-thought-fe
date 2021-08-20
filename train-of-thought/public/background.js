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
      if(tab) {
        console.log("URL Capturada: " + tab.url);
        console.log('Timeout: ' + timeoutValue);
        postCapturedUrl(tab.url);
      }
    });
  },timeoutValue);
}

async function postCapturedUrl(capturedUrl) {
  fetch('http://localhost:8084/capture', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "capturedUrl": capturedUrl })
  }),
  fetch('http://localhost:8084/capture', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(
  function(request) {
    timeoutValue = request[1]*1000;
    console.log('Valor do timeout definido para: ' + timeoutValue + " ms definido via: " + request[0]);
  }
);

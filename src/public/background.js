let analysisTimeout;
let timeoutValue=5000;

getConfiguration(1);

chrome.tabs.onActivated.addListener(activeInfo => makeAnalysis());

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    makeAnalysis();
  }
});

chrome.runtime.onMessage.addListener(
  function(request) {
    setBy = request[0];
    timeoutValue = request[1]*1000;
    putConfiguration(1, setBy, timeoutValue);

    console.log('Valor do timeout definido para: ' + timeoutValue + " ms definido via: " + request[0]);
  }
);

function makeAnalysis(){
  clearTimeout(analysisTimeout);

  analysisTimeout = setTimeout(function(){
    getCurrentTab().then(tab => {
      let date = new Date();
      let momentOfCapture = date.getTime();
      if(tab) {
        console.log("URL Capturada: " + tab.url);
        console.log('Timeout: ' + timeoutValue);
        postCapturedUrl(1, tab.url, momentOfCapture);
      }
    });
  },timeoutValue);
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function postCapturedUrl(userId, capturedUrl, momentOfCapture) {
  fetch('http://localhost:8084/capture', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "userId": userId,
      "capturedUrl": capturedUrl,
      "momentOfCapture": momentOfCapture
    })
  });
}

async function putConfiguration(userId, setBy, timeoutValue) {
  fetch('http://localhost:8084/configuration?userId='+userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "userId": userId, 
      "setBy": setBy,
      "timeoutValue": timeoutValue
    })
  });
}

async function getConfiguration(userId) {
  fetch('http://localhost:8084/configuration?userId='+userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())    // one extra step
  .then(data => {
    if(data != null){timeoutValue = data.timeoutValue;}
    let asd = JSON.stringify(data);
    syncSetConfig("configs", asd);
    syncGetConfig();
   
  })
  .catch(error => console.error(error));  
}

function syncSetConfig(key, value) {
  chrome.storage.sync.set({key: value}, function() {
    console.log(key + ' is set to ' + value);
  });
}

function syncGetConfig() {
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });
}

async function getUrlException(userId) {
  fetch('http://localhost:8084/urlexception?userId='+userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())    // one extra step
  .then(data => {
    return data;
  })
  .catch(error => console.error(error));  
}

async function verifyUrlException(userId, url) {
  fetch('http://localhost:8084/verifyurlexception?userId='+userId+'&url='+url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())    // one extra step
  .then(data => {
    return data;
  })
  .catch(error => console.error(error));  
}

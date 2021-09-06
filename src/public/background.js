let analysisTimeout;
let timeoutValue=5000;

getChromeUserConfig()

chrome.tabs.onActivated.addListener(activeInfo => makeAnalysis());

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    makeAnalysis();
  }
});

chrome.runtime.onMessage.addListener(
  async function(request) {
    email = await getChromeUser();
    setBy = request[0];
    timeoutValue = request[1]*1000;
    putConfiguration(email, setBy, timeoutValue);

    console.log('Valor do timeout definido para: ' + timeoutValue + " ms definido via: " + request[0]);
  }
);

function makeAnalysis(){
  clearTimeout(analysisTimeout);

  analysisTimeout = setTimeout(async function(){
    email = await getChromeUser();
    getCurrentTab().then(tab => {
      let date = new Date();
      let momentOfCapture = date.getTime();
      if(tab) {
        console.log("URL Capturada: " + tab.url);
        console.log('Timeout: ' + timeoutValue);
        postCapturedUrl(email, tab.url, momentOfCapture);
      }
    });
  },timeoutValue);
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getChromeUserConfig() {
  //clearSyncConfig()
  let email = await getChromeUser();
  let userSyncConfig = await getSyncConfig();
  let userDBConfig = await getConfiguration(email);
  
  if (userSyncConfig) {
    timeoutValue = userSyncConfig;
    if (userDBConfig === undefined) {
      postConfiguration(email, "chrome", timeoutValue);
    } else {
      putConfiguration(email, "chrome", timeoutValue)
    }
  } else if (userDBConfig) {
    timeoutValue = userDBConfig.timeoutValue;
    setSyncConfig("configs", JSON.stringify(userDBConfig))
  } else {
    postConfiguration(email, "chrome", timeoutValue);
  }
}

async function getChromeUser() {
  return new Promise((resolve, reject) => {
    try {
      chrome.identity.getProfileUserInfo(async function(info) { 
        resolve(info.email)
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}

function setSyncConfig(key, value) {
  chrome.storage.sync.set({key: value}, function() {
    console.log(key + ' is set to ' + value);
  });
}

function clearSyncConfig() {
  chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    console.log("cleaning")
    if (error) {
        console.error(error);
    }
  });
}

async function getSyncConfig() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(['key'], function(result) {
        if (result.hasOwnProperty("key")) {
          let key = JSON.parse(result.key)
          resolve(key.timeoutValue);
        } else {
          console.log("nao tem config no chrome")
          resolve(false);
        }
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}

async function postCapturedUrl(email, capturedUrl, momentOfCapture) {
  fetch('http://localhost:8085/capture', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "email": email,
      "capturedUrl": capturedUrl,
      "momentOfCapture": momentOfCapture
    })
  });
}

async function postConfiguration(email, setBy, timeoutValue) {
  fetch('http://localhost:8085/configuration?email='+email, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "setBy": setBy,
      "timeoutValue": timeoutValue
    })
  });
}

async function putConfiguration(email, setBy, timeoutValue) {
  fetch('http://localhost:8085/configuration?email='+email, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "setBy": setBy,
      "timeoutValue": timeoutValue
    })
  });
}

async function getConfiguration(email) {
  return new Promise((resolve, reject) => {
    try {
      fetch('http://localhost:8085/configuration?email='+email, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        resolve(data[0]);
      })
      .catch(error => console.error(error));}
    catch (ex) {
        reject(ex);
    }
  });  
}

async function getUrlException(email) {
  fetch('http://localhost:8085/urlexception?email='+email, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.error(error));  
}

async function verifyUrlException(email, url) {
  fetch('http://localhost:8085/verifyurlexception?userId='+email+'&url='+url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.error(error));  
}

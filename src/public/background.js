let analysisTimeout;
let timeoutValue=5000;

getChromeUserConfig()

//syncGetConfig()

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
  fetch('http://localhost:8085/capture', {
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
      }).then(response => response.json())    // one extra step
      .then(data => {
        resolve(data[0]);
      })
      .catch(error => console.error(error));}
    catch (ex) {
        reject(ex);
    }
  });  
}

function syncSetConfig(key, value) {
  chrome.storage.sync.set({key: value}, function() {
    console.log(key + ' is set to ' + value);
  });
}

async function syncGetConfig() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(['key'], function(result) {
        let key = JSON.parse(result.key)
        timeoutValue = key.timeoutValue;
        resolve(timeoutValue);
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}

async function getChromeUserConfig() {
  chrome.identity.getProfileUserInfo(async function(info) { 
    let email = info.email;
    timeoutValue = await syncGetConfig();
    let userDBConfig = await getConfiguration(email);
    
    //se pegar valor do chrome, verifica se tem valor no banco
    if (timeoutValue) {
      console.log("a")
      // se nao tiver valor no banco, add
      if (userDBConfig === undefined) {
        console.log("a1")
        postConfiguration(email, "chrome", timeoutValue);
        //se tiver valor, atualiza
      } else {
        console.log("a2")
        putConfiguration(email, "chrome", timeoutValue);
      }
    } else {
      console.log("b")
    }
  });
}

async function getUrlException(userId) {
  fetch('http://localhost:8085/urlexception?userId='+userId, {
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
  fetch('http://localhost:8085/verifyurlexception?userId='+userId+'&url='+url, {
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

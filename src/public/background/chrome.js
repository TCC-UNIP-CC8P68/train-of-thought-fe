async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getTabs(queryOptions) {
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs;
}

async function getChromeUserConfig() {
  let userSyncConfig = await getSyncConfig();
  let userDBConfig = await getConfiguration(email);
  
  if (userSyncConfig.timeoutValue && userSyncConfig.allowCapture) {
    timeoutValue = userSyncConfig.timeoutValue;
    allowCapture = userSyncConfig.allowCapture;
    if (userDBConfig === undefined) {
      postConfiguration(email, "chrome", timeoutValue);
    } else {
      putConfiguration(email, "chrome", timeoutValue)
    }
  } else if (userDBConfig) {
    timeoutValue = userDBConfig.timeoutValue;
    allowCapture = userDBConfig.allowCapture;
    setSyncConfig("configs", JSON.stringify(userDBConfig))
  } else {
    postConfiguration(email, "chrome", timeoutValue).then(function(res) {
      setSyncConfig("configs", JSON.stringify(res))
    })
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
          resolve(key);
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

async function muteTabs() {
  let audibleTabs = await getTabs( { active: false, audible: true});
  
  if(audibleTabs.length > 0) {
    audibleTabs.map(tabInfo => {
      let tabId = tabInfo.id;
      let isMuted = !tabInfo.mutedInfo.muted;
      
      chrome.tabs.update(tabId, { muted: isMuted });
      console.log((isMuted) ? 'Abas mutadas' : 'Abas desmutadas');
    });
  }
}

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

async function setChromeConfig(key, value) {
  chrome.storage.sync.set({key, value}, function() {
    let chromeConfig = await getChromeConfig();
    console.log(chromeConfig);
  });
}

function objectIsEmpty(object) {
  return Object.keys(object).length === 0;
}

async function getChromeConfig() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(function(result) {
        if (objectIsEmpty(result)) {
          console.log("Erro na getChromeConfig", result)
          resolve(false);
        } else {
          resolve(result);
        }
      })
    } catch (ex) {
      reject(ex);
    }
  });
}

async function dynamicMute() {
  unmuteActive();
  muteTabs();
}

async function dontDisturb(isMuted) {
  isMuted ? muteTabs() : unmuteTabs();
}

async function muteTabs() {
  let audibleTabs = await getTabs({ active: false, audible: true });
   
  if(audibleTabs.length > 0) {
    audibleTabs.map(tabInfo => {
      let tabId = tabInfo.id;
      chrome.tabs.update(tabId, { muted: true });
    });
  } 
}

async function unmuteActive() {
  let mutedTabs = await getTabs({ active: true, muted: true });
  
  if(mutedTabs.length > 0) {
    mutedTabs.map(tabInfo => {
      let tabId = tabInfo.id;
      chrome.tabs.update(tabId, { muted: false });
    });
  } 
}

async function unmuteTabs() {
  let mutedTabs = await getTabs({ muted: true });
  
  if(mutedTabs.length > 0) {
    mutedTabs.map(tabInfo => {
      let tabId = tabInfo.id;
      chrome.tabs.update(tabId, { muted: false });
    });
  } 
}

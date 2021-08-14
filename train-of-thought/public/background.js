var myTimeOut;

chrome.tabs.onActivated.addListener(activeInfo => makeAnalysis());

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    makeAnalysis();
  }
});

function makeAnalysis(){
  clearTimeout(myTimeOut);
  
  var url;

  myTimeOut = setTimeout(function(){
    getCurrentTab().then(v => {
      url = v;
      
      console.log("Starting analysis: " + url);
    });
  },5000);
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return(tab.url);
}



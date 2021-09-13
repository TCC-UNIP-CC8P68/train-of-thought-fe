try {
  importScripts("./background/chrome.js", "./background/apiMethods.js");
} catch (e) {
  console.log(e);
}

let analysisTimeout;
let timeoutValue=5000;
let email;
let allowCapture;

(async () => {
  var thenedPromise = getChromeUser().then(function(value) {
    email=value;
  });

  await thenedPromise;

  getChromeUserConfig()
})();


chrome.tabs.onActivated.addListener(activeInfo => makeAnalysis());

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    makeAnalysis();
  }
});

chrome.runtime.onMessage.addListener(
  async function(req) {
    if (req.field === "timeout") {
      let setBy = req.setBy;
      timeoutValue = req.timeoutValue;
      putConfigurationTimeout(email, setBy, timeoutValue).then(function(res) {
        setSyncConfig("configs", JSON.stringify(res));
      });

      console.log('Valor do timeout definido para: ' + timeoutValue + " ms definido via: " + setBy);
    } else if (req.field === "allowCapture") {
      let setBy = req.setBy;
      allowCapture = req.allowCapture;
      putConfigurationAllowCapture(email, setBy, allowCapture).then(function(res) {
        console.log(res)
        setSyncConfig("configs", JSON.stringify(res));
      });
      
      console.log('Valor do allowCapture definido para: ' + allowCapture + " via: " + setBy);
    }  
  }
);

function makeAnalysis(){
  clearTimeout(analysisTimeout);

  analysisTimeout = setTimeout(async function(){
    if(allowCapture){
      getCurrentTab().then(tab => {
        let date = new Date();
        let momentOfCapture = date.getTime();
        if(tab) {
          console.log("URL Capturada: " + tab.url);
          console.log('Timeout: ' + timeoutValue);
          postCapturedUrl(email, tab.url, momentOfCapture);
        }
      });
    }
  },timeoutValue);
}

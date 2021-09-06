try {
  importScripts("./background/chrome.js", "./background/apiMethods.js");
} catch (e) {
  console.log(e);
}

let analysisTimeout;
let timeoutValue=5000;
let email;

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
  async function(request) {
    setBy = request[0];
    timeoutValue = request[1]*1000;
    putConfiguration(email, setBy, timeoutValue);

    console.log('Valor do timeout definido para: ' + timeoutValue + " ms definido via: " + request[0]);
  }
);

function makeAnalysis(){
  clearTimeout(analysisTimeout);

  analysisTimeout = setTimeout(async function(){
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

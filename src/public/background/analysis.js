async function makeAnalysis(){
  clearTimeout(analysisTimeout);

  analysisTimeout = setTimeout(async function(){
    if(allowCapture){
      let captureUrl = true;
      let tab = await getCurrentTab();
      let urlExceptions = await getUrlException(email);
      urlExceptions.forEach(element => {
        console.log(element.url)
        if(tab.url.match(element.url)) {
          console.log("Url não pode ser capturada")
          captureUrl = false;
        }
      });
      if(captureUrl) {
        let date = new Date();
        let momentOfCapture = date.getTime();
        console.log("URL Capturada: " + tab.url);
        console.log('Timeout: ' + timeoutValue);
        postCapturedUrl(email, tab.url, momentOfCapture);
      }
    }
  },timeoutValue);
}